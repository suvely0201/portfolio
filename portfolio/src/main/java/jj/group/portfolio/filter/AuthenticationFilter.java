package jj.group.portfolio.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFilter implements AuthenticationProvider {

	// @Autowired
	// private UserDao userDao;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		
		String username = authentication.getName();
		String password = authentication.getCredentials().toString();
		
		System.out.println("username ===> " + username);
		System.out.println("password ===> " + password);
		/*
		//AES256Cipher aes = new AES256Cipher();
		//UserVo vo = new UserVo();
		
		try {
			vo.setUsername(aes.AES_Encrypt(username));
			System.out.println("coex ===> " + vo.getUsername());
			System.out.println("password coex1 ===> " + encoder.encode("coex1"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		LoginVo login = userDao.login(vo);
		if(login == null) {
			
			throw new UsernameNotFoundException("존재하지 않는 ID입니다.");
			
		} else {
			
			if(encoder.matches(password, login.getPassword())) {
				
				// 권한을 가져와서 권한 리스트에 넣는다.
				List<GrantedAuthority> authorityRoles = new ArrayList<GrantedAuthority>();
				login.setUserAuthority(userDao.authority(vo));
				
				//Collection<GrantedAuthority> authority = new ArrayList<GrantedAuthority>();
				for(AuthorityVo authRole : login.getUserAuthority()) {
					authorityRoles.add(new SimpleGrantedAuthority(authRole.getAuthority()));
				}
				
				return new UsernamePasswordAuthenticationToken(username, password, authorityRoles);
//				
			}
			
			throw new BadCredentialsException("인증 정보가 정확하지 않습니다.");
			
		}
		*/
		return authentication;
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}
}
