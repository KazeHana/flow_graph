package com.mochasoft.jsmcc.flowgraph.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.mochasoft.jsmcc.flowgraph.dao.VersionDao;
import com.mochasoft.jsmcc.flowgraph.dao.common.MyBatisBaseDao;
import com.mochasoft.jsmcc.flowgraph.entity.Version;

@Repository
public class VersionDaoImpl extends MyBatisBaseDao<Version> implements VersionDao {

	public List<Version> selectByGraphId(long graphId) {
		return selectList(".selectByGraphId", graphId);
	}

	public int selectMaxCode(long graphId) {
		Object maxCode = selectOne(".selectMaxCode", graphId);
		return (Integer)maxCode + 1;
	}
	
}
