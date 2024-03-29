package kr.kh.spring.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.kh.spring.service.MemberService;
import kr.kh.spring.vo.MemberOKVO;
import kr.kh.spring.vo.MemberVO;

@Controller
public class HomeController {
//	http://localhost:8080/spring/
	
	/*Autowired어노테이션 : 인터페이스에 객체를 만들어주는데 인터페이스 구현클래스를 가져다가 자동으로 만들어줌.
	(단 serviceImp 클래스에 Service어노테이션추가해야함)*/
	@Autowired 
	MemberService memberService;
	
	@RequestMapping(value = "/")
	public ModelAndView home(ModelAndView mv) {

		mv.setViewName("/main/home");//연결
		return mv;
	}
	
	@RequestMapping(value = "/signup",method =RequestMethod.GET)
	public ModelAndView signup(ModelAndView mv) {
		mv.setViewName("/member/signup");//연결
		return mv;
	}
	@RequestMapping(value = "/signup",method =RequestMethod.POST )
	public ModelAndView signupPost(ModelAndView mv , MemberVO member) {
		boolean isSignup = memberService.signup(member); //회원가입 성공했는지 물어보기	
		if(isSignup) {
			/*아이디가 주어지면 주어진 아이디의 인증 번호를 발급하고,
			발급한 인증번호를 DB에 저장하고, 이메일로 인증 번호가 있는 링크를 전송하는 기능*/
			memberService.emailAuthentication(member.getMe_id(),member.getMe_email());
			
			mv.setViewName("redirect:/"); //성공하면 메인페이지
		}else {
			mv.setViewName("redirect:/signup");//연결
			return mv;
		}	
		return mv;
	}
	@RequestMapping(value = "/email",method =RequestMethod.GET)
	public ModelAndView email(ModelAndView mv , MemberOKVO mok) {
		
		if(memberService.emailAuthenticationConfirm(mok)) {
			
		}else {
			
		}
		mv.setViewName("redirect:/");//연결
		return mv;
	}

	//로그인
	@RequestMapping(value = "/login",method =RequestMethod.GET)
	public ModelAndView login(ModelAndView mv, HttpServletRequest request) {
		String url = request.getHeader("Referer");
		//다른 URL을 통해 로그인 페이지로 온 경우 =>url != null
		//(단, 로그인 실패로 인해서 login-post에서 온 경우는 제회) =>!url.contains("login")
		if(url != null && !url.contains("login")) {
			request.getSession().setAttribute("prevURL", url); //session에 이전url을 넣어서 저장
		}
		mv.setViewName("/member/login");//연결
		return mv;
	}
	
	@RequestMapping(value = "/login",method =RequestMethod.POST)
	public ModelAndView loginPost(ModelAndView mv,MemberVO member) {
		MemberVO user = memberService.login(member);
		
		if(user != null) {			
			mv.setViewName("redirect:/");//연결
			/*자동로그인 체크여부는 화면에서 가져오는거지 DB에서 가져오는게 아니다.
			 * user는 DB에서 가져온 회원 정보라 자동 로그인 여부를 알수 없다.
			 * 그래서 화면에서 가져온 member에 있는 자동 로그인 여부를 user에 수정
			 */
			user.setAutoLogin(member.isAutoLogin());
		}else
			mv.setViewName("redirect:/login");
		mv.addObject("user",user);
		return mv;
	}
	
	//로그아웃
		@RequestMapping(value = "/logout",method =RequestMethod.GET)
		public ModelAndView logout(ModelAndView mv,HttpSession session,HttpServletResponse response) throws IOException{
			MemberVO user= (MemberVO)session.getAttribute("user");
			if(user !=null) {
				response.setContentType("text/html; charset=UTF-8");
				PrintWriter out = response.getWriter();
				out.println("<script>alert('로그아웃 되었습니다.');location.href='/spring/';</script>");
				out.flush();
			}
			//세션에 있는 정보 삭제
			session.removeAttribute("user");
			user.setMe_session_limit(null);
			memberService.updateMemberBySession(user);
			mv.setViewName("redirect:/");//연결
			return mv;
		}
	
	//get방식
	@RequestMapping(value = "/ex1")
	public ModelAndView ex1(ModelAndView mv, String name,Integer age) {
		System.out.println("예제1 - 화면에서 전달한 이름 : "+name);
		System.out.println("예제1 - 화면에서 전달한 나이 : "+age);
		mv.setViewName("/main/ex1");//연결
		return mv;
	}
	
	//post방식		
	@RequestMapping(value = "/ex2")
	public ModelAndView ex2(ModelAndView mv, String name,Integer age) {
		System.out.println("예제2 - 화면에서 전달한 이름 : "+name);
		System.out.println("예제2 - 화면에서 전달한 나이 : "+age);
		mv.setViewName("/main/ex2");//연결
		return mv;
	}
	
	//경로에 데이터 전송하는 방법
	@RequestMapping(value = "/ex3") 
	public ModelAndView ex3(ModelAndView mv) {
		mv.setViewName("/main/ex3");//연결
		return mv;
	}
	@RequestMapping(value = "/ex3/{name}/{age}")
	public ModelAndView exNameAge3(ModelAndView mv,@PathVariable("name")String name,@PathVariable("age")int age) {
		System.out.println("예제3 - 화면에서 전달한 이름 : "+name);
		System.out.println("예제3 - 화면에서 전달한 나이 : "+age);
		mv.setViewName("/main/ex3");//연결
		return mv;
	}
	
	//서버에서 화면으로 데이터 전송
	@RequestMapping(value = "/ex4") 
	public ModelAndView ex4(ModelAndView mv) {
		/*서버에서 화면으로 이름&나이 전송
		 * - 화면에서 호출할 이름(변수명)과 값을 지정
		 * - addObject를 통해서
		 * */
		mv.addObject("name","김도현");
		mv.addObject("age",26);
		mv.setViewName("/main/ex4");//연결
		return mv;
	}
	
	@ResponseBody
	@RequestMapping(value = "/check/id", method=RequestMethod.POST)
	public Map<String, Object> boardLike(@RequestBody MemberVO user) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		boolean res = memberService.checkId(user);
		map.put("res", res);
		return map;
	}
	
}
