package pers.xmy.simple.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import pers.xmy.simple.entity.SimpleUser;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author yao
 * @since 2023-04-05
 */
public interface ISimpleUserService extends IService<SimpleUser> {

    SimpleUser register(String username, String password);

    SimpleUser login(String username, String password);

    SimpleUser savePassword(Integer id, String oldPassword, String newPassword);

    Boolean logout(Integer id);

    IPage<SimpleUser> findList(Integer pageNum, Integer pageSize);

    IPage<SimpleUser> findListByName(Integer pageNum, Integer pageSize, String username);
}
