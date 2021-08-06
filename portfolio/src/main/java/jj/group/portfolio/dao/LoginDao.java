package jj.group.portfolio.dao;

import java.util.List;

import jj.group.portfolio.object.dto.UserDto;
import jj.group.portfolio.object.vo.AuthorityVo;
import jj.group.portfolio.object.vo.LoginVo;

public interface LoginDao {
	
	// 로그인
	public LoginVo login(UserDto dto);
	
	// 로그인 한 유저의 권한 리스트
	public List<AuthorityVo> getAuthority(UserDto dto);
	
}