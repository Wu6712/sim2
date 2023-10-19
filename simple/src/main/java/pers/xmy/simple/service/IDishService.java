package pers.xmy.simple.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import pers.xmy.simple.entity.Dish;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author yao
 * @since 2023-06-20
 */
public interface IDishService extends IService<Dish> {

    IPage<Dish> findList(Integer pageNum, Integer pageSize);

    IPage<Dish> findListByMenuId(Integer pageNum,Integer pageSize,Integer Id);
}
