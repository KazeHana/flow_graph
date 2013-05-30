package com.mochasoft.jsmcc.flowgraph.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.mochasoft.jsmcc.flowgraph.dao.ProjectDao;
import com.mochasoft.jsmcc.flowgraph.dao.common.MyBatisBaseDao;
import com.mochasoft.jsmcc.flowgraph.entity.Project;

@Repository
public class ProjectDaoImpl extends MyBatisBaseDao<Project> implements ProjectDao{

	public List<Project> selectAll() {
		return selectList(".selectAll", null);
	}

}
