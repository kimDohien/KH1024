package kr.kh.test.dao;

import org.apache.ibatis.annotations.Param;

import kr.kh.test.vo.MemberOKVO;
import kr.kh.test.vo.MemberVO;

public interface MemberDAO {

	String selectMemberName(@Param("num")Integer num);
	

	int insertMember(@Param("member")MemberVO member);

	MemberVO selectMemberByID(@Param("me_id")String me_id);


	void insertMemberOK(@Param("mok")MemberOKVO mok);


	
}
