package com.mochasoft.jsmcc.flowgraph.dao;

import java.util.List;

import com.mochasoft.jsmcc.flowgraph.dao.common.BaseDao;
import com.mochasoft.jsmcc.flowgraph.entity.Version;

public interface VersionDao extends BaseDao<Version> {
	
	List<Version> selectByGraphId(long graphId);
	
	int selectMaxCode(long graphId);
}
