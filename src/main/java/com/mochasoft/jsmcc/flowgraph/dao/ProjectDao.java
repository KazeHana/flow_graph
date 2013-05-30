package com.mochasoft.jsmcc.flowgraph.dao;

import java.util.List;

import com.mochasoft.jsmcc.flowgraph.dao.common.BaseDao;
import com.mochasoft.jsmcc.flowgraph.entity.Project;

public interface ProjectDao extends BaseDao<Project> {
	
	List<Project> selectAll();
}
