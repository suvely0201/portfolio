package jj.group.portfolio.filter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import jj.group.portfolio.dao.LoginDao;
import jj.group.portfolio.object.dto.UserDto;
import jj.group.portfolio.object.vo.LoginVo;
import jj.group.portfolio.util.AES256;

@Component
public class AuthenticationFilter implements AuthenticationProvider {

	@Autowired
	private LoginDao loginDao;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		
		String username = authentication.getName();
		String password = authentication.getCredentials().toString();
		UserDto dto = new UserDto();
		
		try {
			dto.setUsername(AES256.AES_Encrypt(username));
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		LoginVo login = loginDao.login(dto);
		if(login == null) {
			throw new UsernameNotFoundException("존재하지 않는 ID입니다.");
		} else {
			
			// 패스워드 일치할 경우
			if(encoder.matches(password, login.getPassword())) {
				
				// 권한을 가져와서 권한 리스트에 넣는다.
				List<GrantedAuthority> authorityRoles = new ArrayList<GrantedAuthority>();
				/*login.setUserAuthority(userDao.authority(vo));
				
				for(AuthorityVo authRole : login.getUserAuthority()) {
					authorityRoles.add(new SimpleGrantedAuthority(authRole.getAuthority()));
				}*/
				
				return new UsernamePasswordAuthenticationToken(username, password, authorityRoles);
				
			}
			
			// 패스워드 일치하지 않을 경우
			throw new BadCredentialsException("인증 정보가 정확하지 않습니다.");
			
		}
		
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}
	
}
