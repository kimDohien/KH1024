package kr.kh.test.service;

import java.util.ArrayList;

import kr.kh.test.vo.BoardTypeVO;

public interface AdminService {

	ArrayList<BoardTypeVO> getboardTypeListAll();

	boolean insertBoardType(BoardTypeVO bt);

	boolean updateBoardType(BoardTypeVO bt);

	
}
