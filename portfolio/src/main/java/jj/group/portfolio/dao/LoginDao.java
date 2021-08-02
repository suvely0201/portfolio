package jj.group.portfolio.dao;

import jj.group.portfolio.object.dto.UserDto;
import jj.group.portfolio.object.vo.LoginVo;

public interface LoginDao {
	
	// 로그인
	public LoginVo login(UserDto dto);
	
}