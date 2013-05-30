package com.mochasoft.jsmcc.flowgraph.dao;

import java.util.List;

import com.mochasoft.jsmcc.flowgraph.dao.common.BaseDao;
import com.mochasoft.jsmcc.flowgraph.entity.Graph;

public interface GraphDao extends BaseDao<Graph> {
	
	List<Graph> selectByProjectId(long projecrtId);
}
