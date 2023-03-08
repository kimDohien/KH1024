package kr.kh.test.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Param;

import kr.kh.test.vo.BoardTypeVO;
import kr.kh.test.vo.BoardVO;
import kr.kh.test.vo.FileVO;

public interface BoardDAO {

	ArrayList<BoardTypeVO> selectBoardTypeList(@Param("authority")int adminAuthority);


	BoardTypeVO selectBoardTypeByName(@Param("bt_name")String bt_name);


	int insertBoardType(@Param("bt")BoardTypeVO bt);


	int updateBoardType(@Param("bt")BoardTypeVO bt);


	int insertBoard(@Param("bo")BoardVO board);


	void insertFile(@Param("file")FileVO fileVo);

	
	
}
