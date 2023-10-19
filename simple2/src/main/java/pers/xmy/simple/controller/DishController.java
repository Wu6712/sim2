package pers.xmy.simple.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import pers.xmy.simple.entity.Dish;
import pers.xmy.simple.service.IDishService;
import pers.xmy.simple.utils.R;
import pers.xmy.simple.utils.Result;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author yao
 * @since 2023-06-20
 */
@Api(tags = "")
@RestController
@RequestMapping("/dish")
public class DishController {
    @Autowired
    private IDishService dishService;

    @Operation(summary = "列表")
    @GetMapping("/list")
    public Result list(@RequestParam Integer pageNum, @RequestParam Integer pageSize) {
        pageNum = (pageNum - 1) * pageSize;
        IPage<Dish> iPage = dishService.findList(pageNum, pageSize);
        Map<String, Object> res = new HashMap<>();
        res.put("data", iPage.getRecords());
        res.put("total", iPage.getTotal());
        return R.success("查询成功", res);
    }

    @Operation(summary = "更新")
    @PostMapping("/mod")
    public Result mod(@RequestBody Dish dish) {
        return dishService.updateById(dish) ? R.success("更新成功") : R.fail("更新失败");
    }

    @Operation(summary = "删除")
    @PostMapping("/remove")
    public Result remove(Integer id) {
        return dishService.removeById(id) ? R.success("删除成功") : R.fail("删除失败");
    }

    @Operation(summary = "新增")
    @PostMapping("/add")
    public Result add(@RequestBody Dish dish) {
        return dishService.save(dish) ? R.success("新增成功") : R.fail("新增失败");
    }

    @Operation(summary = "批量删除")
    @PostMapping("/remove/batch")
    public Result removeBatch(List<Integer> ids) {
        return dishService.removeByIds(ids) ? R.success("批量删除成功") : R.fail("批量删除失败");
    }

    @Operation(summary = "根据菜单Id查找")
    @PostMapping("/IdList")
    public Result idList(@RequestParam Integer pageNum, @RequestParam Integer pageSize, @RequestParam Integer id) {
        IPage<Dish> dishPage = dishService.findListByMenuId(pageNum, pageSize, id);
        Map<String, Object> res = new HashMap<>();
        res.put("data", dishPage.getRecords());
        res.put("total", dishPage.getTotal());
        return R.success("查询成功", res);
    }
}

