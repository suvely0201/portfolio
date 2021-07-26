import React, { useEffect, useRef, useState } from "react";

function Test() {
	
	useEffect(() => {
		console.log("TETS");
	}, []);

	return (
		<>
			{/* 메세지 전송 부분 */}
			<div style={{
				"position": "fixed",
				"top": "100px"
			}}>
				a1
			</div>
		</>
	);

}

export default Test;