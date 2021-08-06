package jj.group.portfolio.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jj.group.portfolio.object.dto.UserDto;
import jj.group.portfolio.object.vo.AuthorityVo;
import jj.group.portfolio.object.vo.LoginVo;

@Repository("loginDao")
public class LoginDaoImpl implements LoginDao {
	
	@Autowired
	private SqlSession sqlSession;
	
	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	// 로그인
	@Override
	public LoginVo login(UserDto dto) {
		return sqlSession.selectOne("login", dto);
	}

	// 로그인 한 유저의 권한 리스트
	@Override
	public List<AuthorityVo> getAuthority(UserDto dto) {
		return sqlSession.selectList("getAuthority", dto);
	}
}
