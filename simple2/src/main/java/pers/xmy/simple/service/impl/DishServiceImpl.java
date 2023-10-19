package pers.xmy.simple.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import pers.xmy.simple.entity.Dish;
import pers.xmy.simple.mapper.DishMapper;
import pers.xmy.simple.service.IDishService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author yao
 * @since 2023-06-20
 */
@Service
public class DishServiceImpl extends ServiceImpl<DishMapper, Dish> implements IDishService {

    @Override
    public IPage<Dish> findList(Integer pageNum, Integer pageSize) {
        return new Page<>(pageNum,pageSize);
    }

    @Override
    public IPage<Dish> findListByMenuId(Integer pageNum, Integer pageSize, Integer id) {
        return this.page(new Page<>(pageNum,pageSize),new QueryWrapper<Dish>().eq("id",id));
    }
}
