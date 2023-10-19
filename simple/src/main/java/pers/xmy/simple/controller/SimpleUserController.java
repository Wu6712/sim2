package pers.xmy.simple.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import pers.xmy.simple.entity.SimpleUser;
import pers.xmy.simple.service.ISimpleUserService;
import pers.xmy.simple.utils.Auth0Jwt;
import pers.xmy.simple.utils.R;
import pers.xmy.simple.utils.Result;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author yao
 * @since 2023-04-05
 */

@Api(tags = "用户模块")
@CrossOrigin
@RestController
@RequestMapping("/simple-user")
public class SimpleUserController {

    @Autowired
    private ISimpleUserService iSimpleUserService;

    @Operation(summary = "用户注册")
    @PostMapping("/register")
    public Result register(@ApiParam(value = "用户名", name = "username", required = true) @RequestParam("username") String username,
                           @ApiParam(value = "用户名", name = "password", required = true) @RequestParam("password") String password) {
        SimpleUser simpleUser = iSimpleUserService.register(username, password);
        return simpleUser != null ? R.success(simpleUser) : R.fail("注册失败");
    }

    @Operation(summary = "用户登入")
    @PostMapping("/login")
    public Result login(@ApiParam(value = "用户名", name = "username", required = true) @RequestParam("username") String username,
                        @ApiParam(value = "密码", name = "password", required = true) @RequestParam("password") String password) {
        SimpleUser simpleUser = iSimpleUserService.login(username, password);
        return simpleUser != null ? R.LOGIN_SUCCESS(Auth0Jwt.sign(simpleUser.getId(), simpleUser.getUsername(), simpleUser.getPassword())) : R.fail("登录失败");
    }

    @Operation(summary = "修改密码")
    @PutMapping("/info/password")
    public Result savePassword(@RequestParam Integer id, @RequestParam String oldPassword, @RequestParam String newPassword) {
        return iSimpleUserService.savePassword(id, oldPassword, newPassword) != null ? R.success("修改成功") : R.fail("修改失败");
    }

    @Operation(summary = "用户登出")
    @PostMapping("/logout")
    public Result logout(Integer id) {
        return iSimpleUserService.logout(id) ? R.success("退出成功") : R.fail("退出失败");
    }

    @Operation(summary = "用户注销")
    @PostMapping("/logoff")
    public Result logoff(Integer id) {
        return iSimpleUserService.removeById(id) ? R.success("注销成功") : R.fail("注销失败");
    }

    @Operation(summary = "用户更新")
    @PutMapping("/save")
    public Result save(@RequestBody SimpleUser simpleUser) {
        return iSimpleUserService.updateById(simpleUser) ? R.success("更新成功") : R.fail("更新失败");
    }

    @Operation(summary = "用户列表")
    @GetMapping("/list")
    public Result list(@RequestParam Integer pageNum, @RequestParam Integer pageSize) {
        pageNum = (pageNum - 1) * pageSize;
        IPage<SimpleUser> userPage = iSimpleUserService.findList(pageNum, pageSize);
        Map<String, Object> res = new HashMap<>();
        res.put("data", userPage.getRecords());
        res.put("total", userPage.getTotal());
        return R.success("查询成功", res);
    }

    @Operation(summary = "名字模糊查询")
    @GetMapping("/fuzzyList")
    public Result fuzzyList(@RequestParam Integer pageNum, @RequestParam Integer pageSize, @RequestParam String username) {
        IPage<SimpleUser> userPage = iSimpleUserService.findListByName(pageNum, pageSize, username);
        Map<String, Object> res = new HashMap<>();
        res.put("data", userPage.getRecords());
        res.put("total", userPage.getTotal());
        return R.success("查询成功", res);
    }

    @Operation(summary = "批量删除")
    @DeleteMapping("/remove/batch")
    public Result removeBatch(List<Integer> ids){
        return iSimpleUserService.removeByIds(ids) ? R.success("批量删除成功") : R.fail("批量删除失败");
    }

}
