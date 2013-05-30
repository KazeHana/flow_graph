package com.mochasoft.jsmcc.flowgraph.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.mochasoft.jsmcc.flowgraph.dao.GraphDao;
import com.mochasoft.jsmcc.flowgraph.dao.common.MyBatisBaseDao;
import com.mochasoft.jsmcc.flowgraph.entity.Graph;

@Repository
public class GraphDaoImpl extends MyBatisBaseDao<Graph> implements GraphDao {

	public List<Graph> selectByProjectId(long projecrtId) {
		return selectList(".selectByProjectId", projecrtId);
	}
	
}
