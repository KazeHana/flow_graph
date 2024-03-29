/**
 *@namespace
 **/
var Util = {
    /**Return the bounds for a given set of points, useful as every class uses a
     *  similar implementation.
     *@param {Array<Point>} points  - the points collected around the outside of
     *  the shape.
     *@return {Array<Number>} - returns [minX, minY, maxX, maxY] - bounds, where
     *  all points are in the bounds.
     *@author Maxim Georgievskiy <max.kharkov.ua@gmail.com>
     **/
    getBounds:function(points){
        if (!points.length)
            return null;
        var minX = points[0].x;
        var maxX = minX;
        var minY = points[0].y;
        var maxY = minY;
        for (var i = 1; i < points.length; i++) {
            minX = Math.min(minX, points[i].x);
            minY = Math.min(minY, points[i].y);
            maxX = Math.max(maxX, points[i].x);
            maxY = Math.max(maxY, points[i].y);
        }
        return [minX, minY, maxX, maxY];
    },


    /***/
    getUnionBounds: function(shapes){
        //tODo
    },
           
    /**
     * See if some bounds are inside other bounds.
     * Bounds are in form [minX, minY, maxX, maxY]
     * @param {Array<Number>} innerBounds the inner bounds
     * @param {Array<Number>} outerBounds the outer bounds
     * @return {Boolean} true if innerBounds are inside outerBounds
     * */
    areBoundsInBounds : function(innerBounds, outerBounds){
        return (outerBounds[0] <= innerBounds[0] && (innerBounds[0] <= outerBounds[2]))
        && (outerBounds[1] <= innerBounds[1] && (innerBounds[1] <= outerBounds[3]))
        && (outerBounds[0] <= innerBounds[2] && (innerBounds[2] <= outerBounds[2]))
        && (outerBounds[1] <= innerBounds[3] && (innerBounds[3] <= outerBounds[3]));
    },
    
    
    /**Returns a Polygon out of an Array of points 
     *@param {Array} data -  [minX, minY, maxX, maxY]
     **/
    boundsToPolygon: function(data){
        var poly = new Polygon();
        poly.addPoint(new Point(data[0], data[1]));
        poly.addPoint(new Point(data[2], data[1]));
        poly.addPoint(new Point(data[2], data[3]));
        poly.addPoint(new Point(data[0], data[3]));
        
        return poly;
    }, 

    /**Updates first letter of a string
     *@param {String} string -  the actual string
     *@return {String} the string with first letter capitalized
     *@see <a href="http://STACKoverflow.com/questions/1026069/capitalize-first-letter-of-string-in-javascript">http://STACKoverflow.com/questions/1026069/capitalize-first-letter-of-string-in-javascript</a>
     **/
    capitaliseFirstLetter : function(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    },


    /**Increase the area of a rectangle by size in any direction
     *@param {Array} rectangle - the [topX, topY, bottomX, bottomY]
     *@param {Number} size - the size to increase the rectangle in any direction
     *@return {Array} - the new reactangle increased :)
     *@author Alex Gheorghiu <alex@scriptoid.com>
     **/
    feather: function(rectangle, size){
        return [rectangle[0] + size, rectangle[1] + size , rectangle[2] + size , rectangle[3] + size];
    },


    /**Returns the distance between 2 points
     *@param {Point} p1 - first {Point}
     *@param {Point} p2 - second {Point}
     *@return {Number} - the distance between those 2 points. It is always positive.
     *@author Alex Gheorghiu <alex@scriptoid.com>
     **/
    distance: function(p1, p2){
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    },
	
	
	/**Find the location of a point located on segment [p1,p2] at a certain distance from p1
	 *@param {Point} p1 - first {Point}
	 *@param {Point} p2 - second {Point}
	 *@param {Number} distance_from_p1 - the distance from P1 toward P2 where searched point should be
	 *@return {Point} - the distance between those 2 points. It is always positive.
	 *@author Alex Gheorghiu <alex@scriptoid.com>
	 **/
	point_on_segment : function (p1, p2, distance_from_p1){
		var d = Util.distance(p1, p2);
		var Xm = p1.x  + distance_from_p1 / d * (p2.x - p1.x);
		var Ym = p1.y  + distance_from_p1 / d * (p2.y - p1.y);

		return new Point(Xm, Ym);
	},	
	
	
	/*
	* Creates a set of dashes/dots/etc along a set of points
	* points = [p1, p2,p3]
	* pt = [10,2,2 4,7] /*the pattern 10 dotts, 2 spaces, 2 dots, 7 spaces, etc
	* 
	* @param {Context} ctx - Canvas' 2D context
	* @param {Array} points - an {Array} of {Point}s
	* @param {Array} pattern - an {Array} of {Integer}s that define the pattern. 
	* Pattern is increased/decreased to accomodate the lineWidth
	* Ex: Scale whole pattern by line width (ex: if lineWidth = 2 then all variables in patter got multiplied by 2)
	* 
	* @author Alex Gheorghiu <alex@scriptoid.com>
	*/
	decorate : function(ctx, points, pattern){
		
		/*Algorithm:
		 *We begin with first segment and start applying the pattern as many time
		 *as we can on it.  If we complete the segment then we move to next segment
		 *but we have to keep the rest of the pattern (that were not painted yet) and
		 *apply on the next segment (or segments). And so on.
		 **/
		
		function info(msg){
//			console.info(msg);
		}

		function group(name){
//			console.group(name);
		}

		function groupEnd(){
//			console.groupEnd();
		}
			
		var t0 = (new Date).getMilliseconds();
		
		/**Scale the pattern up/down to fit the lineWidth*/
		var pt = [];
		
		for(var i=0; i<pattern.length; i++){
			pt[i] = pattern[i] * ctx.lineWidth;
		}


		/**
		 *@param {Point} p - the {Point}
		 **/
		function lineTo(p){
			ctx.lineTo(p.x, p.y);
		}

		/**
		 *@param {Point} p - the {Point}
		 **/
		function moveTo(p){
			ctx.moveTo(p.x, p.y);
		}

		var current_point = points[0];
		//path = 0
		i = 0 //current point/segment
		pt_i = 0 //index position in pattern
		pt_left = pt[0] // spaces or dotts left to paint from current index position in pattern
		
		info("current_point" + current_point);
		
		//position at the begining
		moveTo(current_point);



		while (i < points.length - 1) {
			//inside [Pi, Pi+1] segment
			segment_path = 0 //how much of current segment was painted

			group("Paint segment " + i);
			info("i = " + i + " current_point = " + current_point + " pt_i = " + pt_i + " pt_left = " + pt_left + " segment_path = " + segment_path );

			if(pt_left < 0){
				break;
			}


			//paint previous/left part of pattern
			if ( pt_left > 0 ){
				group("Paint rest of pattern");
				info("Pattern left,  pt_left : " + pt_left + " pt_i : " + pt_i);

				//are we about to cross to another segment?
				if ( pt_left > Util.distance(current_point, points[i+1]) ) { //we exceed current segment
					info("We exceed current segment");

					//paint what is left and move to next segment
					if ( pt_i % 2 == 0 ) { //dots
						lineTo(points[i+1]) 					
					}
					else{ //spaces
						moveTo(points[i+1])
					}

					//store what was left unpainted
					segment_path += Util.distance(current_point,  points[i+1]);
					pt_left = pt_left - Util.distance(current_point, points[i+1])	
					current_point = points[i+1]
					i++; //move to next segment
					groupEnd(); //end inner group
					groupEnd(); //end outer group
					continue;
				}			
				else{ //still inside segment
					info("Painting from rest path pt_i = " + pt_i + " current_segment = " + segment_path);
					var newP = Util.point_on_segment(current_point, points[i+1], pt_left) //translate on current_point with pt_left from Pi to Pi+1
					info("\t newP = " + newP);
					if ( pt_i % 2 == 0 ) { //dots
						lineTo(newP) 					
					}
					else{ //spaces
						moveTo(newP)
					}

					segment_path += Util.distance(current_point,  newP);	
					current_point = newP
					pt_left = 0
					pt_i = (pt_i + 1) % pt.length;
				}
				groupEnd();
			}



			/*We should have:
				pt_i >= 0
				pt_left = 0;
			*/
			group('No rest left, normal paint');
			info("We should have (pt_i >= 0) and (pt_left = 0) AND WE HAVE " + "pt_i = " + pt_i + " pt_left = " + pt_left);


			//nothing left from previous segment
			while(segment_path < Util.distance(points[i], points[i+1])){
				info("Distance between " + i + " and " + (i + 1) + " = " + Util.distance(points[i], points[i+1]));


				info("...painting path pt_i = " + pt_i + " dot/space length = " + pt[pt_i] + " current_segment = " + segment_path);
				if(segment_path + pt[pt_i] <= Util.distance(points[i], points[i+1])){ //still inside segment
					group("Still inside segment");
					var newP = Util.point_on_segment(current_point, points[i+1], pt[pt_i]) //translate on current segment with pt[pt_i] from Pi to Pi+1
					info("\t newP = " + newP);
					if(pt_i % 2 == 0) {
						lineTo(newP);
					}
					else{
						moveTo(newP);
					}
					pt_left = 0
					segment_path += pt[pt_i];
					current_point = newP;
					pt_i = (pt_i + 1) % pt.length;
					groupEnd();
				}
				else{ //segment exceeded
					group("Exceed segment");
					if(pt_i % 2 == 0) {
						lineTo(points[i+1]);
					}
					else{
						moveTo(points[i+1]);
					}
					pt_left = pt[pt_i] - Util.distance(current_point, points[i+1]);
					segment_path += Util.distance(current_point,  points[i+1]);
					current_point = points[i+1];
					info("...pt_left = " + pt_left + " current_segment = " + segment_path + " current_point = " + current_point);
					//move to next segment							
					groupEnd(); //end inner group							
					break;
				}


			}
			groupEnd();


			++i;

			groupEnd();
		}

		var t1 = (new Date).getMilliseconds();
		console.info("Took " + (t1 - t0) + " ms");
	},
    
	
    /**Trim a number to a fixed number or decimals
     *@param {Numeric} number - the number to be trimmed
     *@param {Integer} decimals - the number of decimals to keep
     *@author Zack
     **/
    round:function(number, decimals){
        return Math.round(number*Math.pow(10,decimals))/Math.pow(10,decimals);
    },


    /**Returns the lenght between 2 points
     *@param {Point} startPoint - one point
     *@param {Point} endPoint - the other point
     *@return {Number} - the distance
     **/
    getLength:function(startPoint,endPoint){
        return Math.sqrt( Math.pow(startPoint.x-endPoint.x,2) + Math.pow(startPoint.y-endPoint.y,2) );
    },


    /**Returns the length of a Polyline that would be created with a set of points
     *@param {Array} v - an {Array} of {Points}
     *@return {Number} - a positive number equal with total length*/
    getPolylineLength:function(v){
        var l = 0;
        for(var i=0;i<v.length-1; i++){
            l += Util.getLength(v[i], v[i+1]);
        }

        return l;
    },


    /**
     *Tests if a a line defined by 2 points intersects a rectangle
     *@param {Point} startPoint - the starting point
     *@param {Point} endPoint - the ending point
     *@param {Array} bounds - the bounds of the rectangle defined by (x1, y1, x2, y2)
     *@return true - if line intersects the rectangle, false - if not
     *@author Alex Gheorghiu <alex@scriptoid.com>
     **/
    lineIntersectsRectangle:function(startPoint, endPoint, bounds){
        //create the initial line/segment
        var l = new Line(startPoint, endPoint);

        //get the 4 lines/segments represented by the bounds
        var lines = [];
        lines.push( new Line( new Point(bounds[0], bounds[1]), new Point(bounds[2], bounds[1])) );
        lines.push( new Line( new Point(bounds[2], bounds[1]), new Point(bounds[2], bounds[3])) );
        lines.push( new Line( new Point(bounds[2], bounds[3]), new Point(bounds[0], bounds[3])) );
        lines.push( new Line( new Point(bounds[0], bounds[3]), new Point(bounds[0], bounds[1])) );

        //check if our line intersects any of the 4 lines
        for(var i=0; i<lines.length; i++){
            if(this.lineIntersectsLine(l, lines[i])){
                return true;
            }
        }
        
        return false;
    },
    
    /**
     *Tests if a a polyline defined by a set of points intersects a rectangle
     *@param {Array} points - and {Array} of {Point}s
     *@param {Array} bounds - the bounds of the rectangle defined by (x1, y1, x2, y2)
     *@param {Boolean} closedPolyline - incase polyline is closed figure then true, else false
     * 
     *@return true - if line intersects the rectangle, false - if not
     *@author Alex Gheorghiu <alex@scriptoid.com>
     *@author Janis Sejans <janis.sejans@towntech.lv>
     **/
    polylineIntersectsRectangle:function(points, bounds, closedPolyline){
        

        //get the 4 lines/segments represented by the bounds
        var lines = [];
        lines.push( new Line( new Point(bounds[0], bounds[1]), new Point(bounds[2], bounds[1])) );
        lines.push( new Line( new Point(bounds[2], bounds[1]), new Point(bounds[2], bounds[3])) );
        lines.push( new Line( new Point(bounds[2], bounds[3]), new Point(bounds[0], bounds[3])) );
        lines.push( new Line( new Point(bounds[0], bounds[3]), new Point(bounds[0], bounds[1])) );

        for(var k=0; k < points.length-1; k++){
            //create a line out of each 2 consecutive points            
            var tempLine = new Line(points[k], points[k+1]);
            
            //see if that line intersect any of the line on bounds border
            for(var i=0; i<lines.length; i++){
                if(this.lineIntersectsLine(tempLine, lines[i])){
                    return true;
                }
            }
        }
        
        //check the closed figure - that is last point connected to the first
        if (closedPolyline){
            //create a line out of each 2 consecutive points            
            var tempLine = new Line(points[points.length-1], points[0]);
            
            //see if that line intersect any of the line on bounds border
            for(var i=0; i<lines.length; i++){
                if(this.lineIntersectsLine(tempLine, lines[i])){
                    return true;
                }
            }            
        }        
        
        return false;
    },


    /**
     *Test to see if 2 {Line}s intersects. They are considered finite segments
     *and not the infinite lines from geometry
     *@param {Line} l1 - fist line/segment
     *@param {Line} l2 - last line/segment
     *@return {Boolean} true - if the lines intersect or false if not
     *@author Alex Gheorghiu <alex@scriptoid.com>
     *@author Maxim Georgievskiy <max.kharkov.ua@gmail.com>
     **/
    lineIntersectsLine: function(l1,  l2){
        // check for two vertical lines
        if (l1.startPoint.x == l1.endPoint.x && l2.startPoint.x == l2.endPoint.x) {
            return l1.startPoint.x == l2.startPoint.x ? // if 'infinite 'lines do coincide,
			// then check segment bounds for overlapping
			l1.contains(l2.startPoint.x, l2.startPoint.y) ||
                l1.contains(l2.endPoint.x, l2.endPoint.y) :
                // lines are paralel
			false;
        }
        // if one line is vertical, and another line is not vertical
        else if (l1.startPoint.x == l1.endPoint.x || l2.startPoint.x == l2.endPoint.x) {
            // let assume l2 is vertical, otherwise exchange them
            if (l1.startPoint.x == l1.endPoint.x) {
                var l = l1;
                l1 = l2;
                l2 = l;
            }
            // finding intersection of 'infinite' lines
            // equation of the first line is y = ax + b, second: x = c
            var a = (l1.endPoint.y - l1.startPoint.y) / (l1.endPoint.x - l1.startPoint.x);
            var b = l1.startPoint.y - a * l1.startPoint.x;
            var x0 = l2.startPoint.x;
            var y0 = a * x0 + b;
            return l1.contains(x0, y0) && l2.contains(x0, y0);
        }

        // check normal case - both lines are not vertical
        else {
            //line equation is : y = a*x + b, b = y - a * x
            var a1 = (l1.endPoint.y - l1.startPoint.y) / (l1.endPoint.x - l1.startPoint.x);
            var b1 = l1.startPoint.y - a1 * l1.startPoint.x;

            var a2 = (l2.endPoint.y - l2.startPoint.y) / (l2.endPoint.x - l2.startPoint.x);
            var b2 = l2.startPoint.y - a2 * l2.startPoint.x;

            if(a1 == a2) { //paralel lines
                return b1 == b2 ?
                    // for coincide lines, check for segment bounds overlapping
				l1.contains(l2.startPoint.x, l2.startPoint.y) || l1.contains(l2.endPoint.x, l2.endPoint.y) 
				:
                    // not coincide paralel lines have no chance to intersect
				false;
            } else { //usual case - non paralel, the 'infinite' lines intersects...we only need to know if inside the segment

                /*
                 * if one of the lines are vertical, then x0 is equal to their x,
                 * otherwise:
                 * y1 = a1 * x + b1
                 * y2 = a2 * x + b2
                 * => x0 = (b2 - b1) / (a1 - a2)
                 * => y0 = a1 * x0 + b1
                 **/
                x0 = (b2 - b1) / (a1 - a2);
                y0 = a1 * x0 + b1;
                return l1.contains(x0, y0) && l2.contains(x0, y0);
            }
        }
    },
    
    
    /**Tests if 3 points are coliniar (similar to geometry ...with infinite lines)
     *@param {Point} p1 - first point
     *@param {Point} p2 - second point
     *@param {Point} p3 - third point
     *@return {Boolean} - true if coliniar and false if not
     *@author Alex
     **/
    collinearity: function(p1, p2, p3){
        // check for vertical line
        if (p1.x == p2.x) {
            return p3.x == p1.x;
        } else { // usual (not vertical) line can be represented as y = a * x + b
            var a = (p2.y - p1.y) / (p2.x - p1.x);
            var b = p1.y - a * p1.x;
            return p3.y == a * p3.x + b;
        }
    },


    /** It will return the end point of a line on a given angle (clockwise).
     * @param {Point} startPoint - the start of the line
     * @param {Number} length - the length of the line
     * @param {Number} angle - the angle of the line in radians
     * @return {Point} - the endPoint of the line
     * @autho Zack
     */
    getEndPoint:function(startPoint, length, angle){
        var endPoint = startPoint.clone();
        endPoint.transform(Matrix.translationMatrix(-startPoint.x, -startPoint.y));
        endPoint.y -= length;
        endPoint.transform(Matrix.rotationMatrix(angle));
        endPoint.transform(Matrix.translationMatrix(startPoint.x, startPoint.y));
        return endPoint;
    },
    
    
    /** Will return the angle of rotation between 2 points, with 0 being north.
     * Actually the angle with N on a compass
     * @param {@link Point} centerPoint - the point that is to be considered the center of the shape
     * @param {@link Point} outsidePoint - the point that we need to find the rotation about the center.
     * @param {Number} round - amount to round to nearest angle (optional). Think of it as precision
     * @return {Number} - the angle in radians
     * @see /documentation/specs/getAngle.png
     * @author Alex Gheorghiu <alex@scriptoid.com>
     * */
    getAngle:function(centerPoint, outsidePoint, round){
        centerPoint.x = Util.round(centerPoint.x, 5);
        centerPoint.y = Util.round(centerPoint.y, 5);
        outsidePoint.x = Util.round(outsidePoint.x, 5);
        outsidePoint.y = Util.round(outsidePoint.y, 5);
        var angle=Math.atan((outsidePoint.x-centerPoint.x)/(outsidePoint.y-centerPoint.y));
        angle=-angle;

        //endAngle+=90;
        if(outsidePoint.x>=centerPoint.x && outsidePoint.y>=centerPoint.y){
            angle+=Math.PI;
        }
        else if(outsidePoint.x<=centerPoint.x && outsidePoint.y>=centerPoint.y){
            angle+=Math.PI;
        }
        else if(outsidePoint.x<=centerPoint.x && outsidePoint.y<=centerPoint.y){
            angle+=Math.PI*2;
        }
        while(angle>=Math.PI*2){
            angle-=Math.PI*2;
        }
        if(isNaN(angle)){//Nan
            angle=0;//we are at center point;
        }
        if(round){
			angle = Math.round(angle / round) * round
        }
        return angle;
    },


    /**
     *Computes the angle formed by 3 {Point}s
     *@param {@link Point} startPoint - the start point
     *@param {@link Point} centerPoint - the center/tid of the angle point
     *@param {@link Point} endPoint - the end/angle point
     *@param {Number} round - amount to round to nearest angle (optional)
     *@author Alex Gheorghiu <alex@scriptoid.com>
     */
    getAngle3Points:function(startPoint, centerPoint,endPoint, round){
        var a1 = Util.getAngle(centerPoint, startPoint);
        var a2 = Util.getAngle(centerPoint, endPoint);

        var angle = a2 - a1;
        
        if(round){
			angle = Math.round(angle / round) * round
        }
        
        return angle;
    },


    /**
    /* Tests whether a point is inside the area (excluding border) determined by a set of other points.
     * If the points is on the border of the area it will not be counted
     *
     * @param point {Point} the point we want to chek
     * @param points {Array<Point>} a set of points ordered clockwise.
     * @see  <a href="http://local.wasp.uwa.edu.au/~pbourke/geometry/insidepoly/">http://local.wasp.uwa.edu.au/~pbourke/geometry/insidepoly/</a> solution 1
     * */
    isPointInside:function(point, points){
        if(points.length < 3){
            return false;
        }
        var counter = 0;
        var p1 = points[0];

        //calulates horizontal intersects
        for (var i=1; i<=points.length; i++) {
            var p2 = points[i % points.length];
            if (point.y > Math.min(p1.y,p2.y)) { //our point is between start(Y) and end(Y) points
                if (point.y <= Math.max(p1.y,p2.y)) {
                    if (point.x <= Math.max(p1.x,p2.x)) { //to the left of any point
                        if (p1.y != p2.y) { //no horizontal line
                            var xinters = (point.y-p1.y)*(p2.x-p1.x)/(p2.y-p1.y)+p1.x;//get slope of line and make it start from the same place as p1
                            if (p1.x == p2.x || point.x <= xinters){ //if vertical line or our x is before the end x of the actual line.
                                counter++; //we have an intersection
                            }
                        }
                    }
                }
            }
            p1 = p2;
        }

        if (counter % 2 == 0){
            return false;
        }
        else{
            return true;
        }
    },


    /**
     /* Tests whether a point is inside the area (including border) determined by a set of other points.
     * If the points is on the border of the area it will be counted
     *
     * Algorithm: just get border (min/max) values for x and y
     * and then check if target point inside and on a borer or outside of points
     *
     * @param point {Point} the point we want to check
     * @param points {Array<Point>} a set of points ordered clockwise.
     * */
    isPointInsideOrOnBorder:function(point, points){
        if(points.length < 3){
            return false;
        }

        // set min & max values to coordinates of first point
        var minX = points[0].x;
        var maxX = points[0].x;
        var minY = points[0].y;
        var maxY = points[0].y;

        // go through points and get min and max x, y values
        for (var i = 1; i < points.length; i++) {
            var p = points[i];

            minX = Math.min(p.x,minX);
            maxX = Math.max(p.x,maxX);
            minY = Math.min(p.y,minY);
            maxY = Math.max(p.y,maxY);
        }

        // check if point is inside and on a border of points or outside
        if (point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY) {
            return true;
        } else {
            return false;
        }
    },
    

	/**
     * Calculates the number of times the line from (x0,y0) to (x1,y1)
     * crosses the ray extending to the right from (px,py).
     * If the point lies on the line, then no crossings are recorded.
     * +1 is returned for a crossing where the Y coordinate is increasing
     * -1 is returned for a crossing where the Y coordinate is decreasing
     */
    pointCrossingsForLine: function(px, py, x0, y0,x1,y1)
    {
        if (py <  y0 && py <  y1) return 0;
        if (py >= y0 && py >= y1) return 0;
        // assert(y0 != y1);
        if (px >= x0 && px >= x1) return 0;
        if (px <  x0 && px <  x1) return (y0 < y1) ? 1 : -1;
        var xintercept = x0 + (py - y0) * (x1 - x0) / (y1 - y0);
        if (px >= xintercept) return 0;
        return (y0 < y1) ? 1 : -1;
    },


    /**
     * Calculates the number of times the cubic from (x0,y0) to (x1,y1)
     * crosses the ray extending to the right from (px,py).
     * If the point lies on a part of the curve,
     * then no crossings are counted for that intersection.
     * the level parameter should be 0 at the top-level call and will count
     * up for each recursion level to prevent infinite recursion
     * +1 is added for each crossing where the Y coordinate is increasing
     * -1 is added for each crossing where the Y coordinate is decreasing
     */
    pointCrossingsForCubic: function (px, py, x0, y0, xc0, yc0, xc1, yc1, x1, y1, level)
    {
        if (py <  y0 && py <  yc0 && py <  yc1 && py <  y1) return 0;
        if (py >= y0 && py >= yc0 && py >= yc1 && py >= y1) return 0;
        // Note y0 could equal yc0...
        if (px >= x0 && px >= xc0 && px >= xc1 && px >= x1) return 0;
        if (px <  x0 && px <  xc0 && px <  xc1 && px <  x1) {
            if (py >= y0) {
                if (py < y1) return 1;
            } else {
                // py < y0
                if (py >= y1) return -1;
            }
            // py outside of y01 range, and/or y0==yc0
            return 0;
        }
        // double precision only has 52 bits of mantissa
        if (level > 52) return pointCrossingsForLine(px, py, x0, y0, x1, y1);
        var xmid = (xc0 + xc1) / 2;
        var ymid = (yc0 + yc1) / 2;
        xc0 = (x0 + xc0) / 2;
        yc0 = (y0 + yc0) / 2;
        xc1 = (xc1 + x1) / 2;
        yc1 = (yc1 + y1) / 2;
        var xc0m = (xc0 + xmid) / 2;
        var yc0m = (yc0 + ymid) / 2;
        var xmc1 = (xmid + xc1) / 2;
        var ymc1 = (ymid + yc1) / 2;
        xmid = (xc0m + xmc1) / 2;
        ymid = (yc0m + ymc1) / 2;
        if (isNaN(xmid) || isNaN(ymid)) {
            // [xy]mid are NaN if any of [xy]c0m or [xy]mc1 are NaN
            // [xy]c0m or [xy]mc1 are NaN if any of [xy][c][01] are NaN
            // These values are also NaN if opposing infinities are added
            return 0;
        }
        return (Util.pointCrossingsForCubic(px, py,
		x0, y0, xc0, yc0,
		xc0m, yc0m, xmid, ymid, level+1) +
			Util.pointCrossingsForCubic(px, py,
		xmid, ymid, xmc1, ymc1,
		xc1, yc1, x1, y1, level+1));
    },


    /**Returns the min of a vector
     *@param {Array} v - vector of {Number}s
     *@return {Number} - the minimum number from the vector or NaN if vector is empty
     *@author alex@scriptoid.com
     **/
    min:function(v){
        if(v.lenght == 0){
            return NaN;
        }
        else{
            var m = v[0];
            for(var i=0;i<v.length; i++){
                if(m > v[i]){
                    m = v[i];
                }
            }

            return m;
        }
    },


	/**Returns the max of a vector
     *@param {Array} v - vector of {Number}s
     *@return {Number} - the maximum number from the vector or NaN if vector is empty
     *@author alex@scriptoid.com
     **/
    max:function(v){
        if(v.lenght == 0){
            return NaN;
        }
        else{
            var m = v[0];
            for(var i=0;i<v.length; i++){
                if(m < v[i]){
                    m = v[i];
                }
            }

            return m;
        }
    },
    
    /**
     *Tests if a vector of points is a valid path (not going back)
     *There are a few problems here. If you have p1, p2, p3 and p4 and p2 = p3 you need to ignore that
     *@param {Array} v - an {Array} of {Point}s
     *@return {Boolean} - true if path is valid, false otherwise
     *@author Alex <alex@scriptoid.com>
     **/
    forwardPath : function(v){
        if(v.length <= 2){
            return true;
        }

        for(var i=0; i < v.length-2; i++){
            if(v[i].x == v[i+1].x && v[i+1].x == v[i+2].x){ //on the same vertical
                if(signum(v[i+1].y - v[i].y) != 0){ //test only we have a progressing path
                    if(signum(v[i+1].y - v[i].y) == -1 * signum(v[i+2].y - v[i+1].y)){ //going back (ignore zero)
                        return false;
                    }
                }
            }
            else if(v[i].y == v[i+1].y && v[i+1].y == v[i+2].y){ //on the same horizontal
                if(signum(v[i+1].x - v[i].x) != 0){ //test only we have a progressing path
                    if(signum(v[i+1].x - v[i].x) == -1* signum(v[i+2].x - v[i+1].x)){ //going back (ignore zero)
                        return false;
                    }
                }
            }            
        }

        return true;
    },
    
    /**
     *Tests if a vector of points is an orthogonal path (moving in multiples of 90 degrees)
     *@param {Array} v - an {Array} of {Point}s
     *@return {Boolean} - true if path is valid, false otherwise
     *@author Alex <alex@scriptoid.com>
     **/
    orthogonalPath : function(v){
        if(v.length <= 1){ 
            return true;
        }

        for(var i=0; i < v.length-1; i++){
            if(v[i].x != v[i+1].x && v[i].y != v[i+1].y){
                return false;
            }
        }

        return true;
    },
    
    
    /**Tries to cut the unecessary poins.
     *Ex: If you have 3 points A,B and C and they are collinear then B will be cut
     *@param {Array} v - an {Array} of {Point}s
     *@return {Array} - the "reduced" vector of {Point}s
     *@author Alex <alex@scriptoid.com>
     **/    
    collinearReduction : function (v){
        var r = [];
        
        if(v.length < 3){
            return Point.cloneArray(v);
        }
        
        r.push( v[0].clone() );
        for(var i=1; i < v.length-1; i++){
            if( (v[i-1].x == v[i].x && v[i].x == v[i+1].x)  ||  (v[i-1].y == v[i].y && v[i].y == v[i+1].y) )
            {
                continue;
            }
            else{
                r.push( v[i].clone() );
            }
        }
        r.push( v[v.length-1].clone() );
        
        return r;
    },
    
    
    
    
    /**Score a ortogonal path made out of Points
     *Iterates over a set of points (minimum 3)
     *For each 3 points (i, i+1, i+2) :
     *  - if the 3rd one is after the 2nd on the same line we add +1 
     *  - if the 3rd is up or down related to the 2nd we do not do anything +0
     *  - if the 3rd goes back we imediatelly return -1
     *@param {Array} v - an array of {Point}s
     *@return {Number} - -1 if the path is wrong (goes back) or something >= 0 if is fine
     *  The bigger the number the smooth the path is
     *@author Alex Gheorghiu <alex@scriptoid.com>
     **/
    scorePath:function(v){
        if(v.length <= 2){
            return -1;
        }

        var score = 0;
        for(var i=1; i < v.length-1; i++){
            if(v[i-1].x == v[i].x && v[i].x == v[i+1].x){ //on the same vertical
                if(signum(v[i+1].y - v[i].y) == signum(v[i].y - v[i-1].y)){ //same direction
                    score++;
                }
                else{ //going back - no good
                    return -1;
                }
            }
            else if(v[i-1].y == v[i].y && v[i].y == v[i+1].y){ //on the same horizontal
                if(signum(v[i+1].x - v[i].x) == signum(v[i].x - v[i-1].x)){ //same direction
                    score++;
                }
                else{ //going back - no good
                    return -1;
                }
            }
            else{ //not on same vertical nor horizontal
                score--;
            }
        }

        return score;
    },
    
    
    /**
     * Function to be used as a replacer in JSON's stringify process.
     * We need this as Opera does some rounding (@see https://bitbucket.org/scriptoid/diagramo/issue/35/serialization-fails-on-opera-1115)
     * @param {String} key the property of an object
     * @param  val the value of the key
     * @see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/JSON/stringify
     * @see https://developer.mozilla.org/en-US/docs/Using_native_JSON#The_replacer_parameter
     * @see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number/toFixed
     * @author Artyom, Alex
     * */
    operaReplacer : function (key, val) {
        if (typeof(val) !== 'undefined' && val !== null) {
            // As toFixed(...) method is specific only for Number type we will use it to test if val is actually a Number
            if (val.toFixed) {
                val = val.toFixed(20); //this will ensure that ANY string representation will have a . (dot) and some 0 (zero)s at the end

                // check if val has decimals and it ends with zero(s)
                if (/\.\d*0+$/.test(val)) {
                    // remove last decimal zero(s) from the end of val (and with dot if it is actually)
                    val = val.replace(/(\.)?0+$/, '');
                }
            }
        }
        return val;

        /*by default the return will be undefined which means the 'key' will not be stringified
         * "If you return undefined, the property is not included in the output JSON string."
         */
    }


};

/**Returns the sign of a number
 *@param {Number} x - the number
 *@returns {Number}
 *@see <a href="http://en.wikipedia.org/wiki/Sign_function">http://en.wikipedia.org/wiki/Sign_function</a>
 *@author alex@scriptoid.com
 **/
function signum(x){
    if(x > 0)
        return 1;
    else if(x < 0)
        return -1;
    else
        return 0;
}

/** Check if a value is numeric
 * @param {String} input - a numeric value
 * @see <a href="http://STACKoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric">http://STACKoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric</a>
 * @author Zack Newsham <zack_newsham@yahoo.co.uk>
 * */
function isNumeric(input){
	return (input - 0) == input && (input.length > 0 || input != "");
}

/**Repeats a string for several time and return the concatenated result
 *@param {String} str - the string
 *@param  {Integer} count - the number of time the string should be repeated
 *@return {String}
 **/
function repeat(str, count){
    var res = '';
    for(var i=0;i<count;i++){
        res += str;
    }
    
    return res;
}

/**
 * Set selection on target interval inside text DOM element
 * @param {HTMLElement} input - DOM element to set selection
 * @param {Number} selectionStart - start position of selection
 * @param {Number} selectionEnd - end position of selection
 * @author Artyom
 **/
function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }
}

/**A simple class to detect browser and it's version using navigator properties.
 * Computing logic can be found here: http://stackoverflow.com/a/2401861/2097494
 *
 * @this {Browser}
 * @constructor
 **/
function Browser() {
    var N = navigator.appName.toLowerCase();
    var ua = navigator.userAgent.toLowerCase();
    var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    var temp = ua.match(/version\/([\.\d]+)/i);
    if(M && temp != null) {
        M[2]= temp[1];
    }
    M= M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];

    this.webkit = M[0].indexOf("chrome") > -1 || M[0].indexOf("safari") > -1;
    this.opera = M[0].indexOf("opera") > -1;
    this.msie = M[0].indexOf("msie") > -1;
    this.mozilla = M[0].indexOf("firefox") > -1;
    this.version = M[1];
}

/**
 * Binds event to DOM element
 * @param {HTMLElement} element - DOM element to bind event
 * @param {String} event - name of target event
 * @param {Function} handler - function to bind
 *
 * @author Artyom Pokatilov <artyom.pokatilov@gmail.com>
 *
 * Note:  <br/>
 * Cross-browser solution for native JS.
 */
//function bindEvent(element, event, handler) {
//    if (element.attachEvent) {
//        element.attachEvent('on' + event, handler);  // IE
//    } else {
//        element.addEventListener(event, handler, false);
//    }
//}

/**
 * Binds event to NodeList
 * @param {NodeList} list - NodeList to bind event
 * @param {String} event - name of target event
 * @param {Function} handler - function to bind
 *
 * @author Artyom Pokatilov <artyom.pokatilov@gmail.com>
 *
 * Note:  <br/>
 * Cross-browser solution for native JS.
 */
//function bindEventToNodeList(list, event, handler) {
//    var i;
//    var length = list.length;
//
//    for (i = 0; i < length; i++) {
//        bindEvent(list[i], event, handler);
//    }
//}

/**
 * Unbinds event to DOM element
 * @param {HTMLElement} element - DOM element to unbind event
 * @param {String} event - name of target event
 * @param {Function} handler - function to unbind
 *
 * @author Artyom Pokatilov <artyom.pokatilov@gmail.com>
 *
 * Note:  <br/>
 * Cross-browser solution for native JS.
 */
//function unBindEvent(element, event, handler) {
//    if (element.detachEvent) {
//        element.detachEvent('on' + event, handler);  // IE
//    } else {
//        element.removeEventListener(event, handler, false);
//    }
//}

/**
 * Unbinds event from NodeList
 * @param {NodeList} list - NodeList to unbind event
 * @param {String} event - name of target event
 * @param {Function} handler - function to unbind
 *
 * @author Artyom Pokatilov <artyom.pokatilov@gmail.com>
 *
 * Note:  <br/>
 * Cross-browser solution for native JS.
 */
//function unBindEventFromNodeList(list, event, handler) {
//    var i;
//    var length = list.length;
//
//    for (i = 0; i < length; i++) {
//        unBindEvent(list[i], event, handler);
//    }
//}

/**
 * Removes DOM element
 * @param {HTMLElement} element - DOM element to remove
 *
 * @author Artyom Pokatilov <artyom.pokatilov@gmail.com>
 *
 * Note:  <br/>
 * Cross-browser solution for native JS.
 */
function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
}

/**
 * Removes NodeList
 * @param {NodeList} list - NodeList to remove
 *
 * @author Artyom Pokatilov <artyom.pokatilov@gmail.com>
 *
 * Note:  <br/>
 * Cross-browser solution for native JS.
 */
function removeNodeList(list) {
    var i;
    var length = list.length;

    for (i = 0; i < length; i++) {
        removeElement(list[i]);
    }
}
