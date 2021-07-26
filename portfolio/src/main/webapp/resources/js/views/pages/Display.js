import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { useCookies } from "react-cookie";

import * as StompJS from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { getDisplay } from "../../reducers/displayReducer";

function Display() {
	
	// 초기세팅
	const roomId = useRef(0);
	const client = useRef({});
	const [ chat, setChat ] = useState([]);
	const [ msg, setMsg ] = useState("");

	const roomId2 = useRef(1);
	const client2 = useRef({});
	const [ chat2, setChat2 ] = useState([]);
	const [ msg2, setMsg2 ] = useState("");

	const roomId3 = useRef(2);
	const client3 = useRef({});
	const [ chat3, setChat3 ] = useState([]);
	const [ msg3, setMsg3 ] = useState("");




	const [ cookie ] = useCookies(["XSRF-TOKEN"]);
	const csrf = cookie["XSRF-TOKEN"];
	


	const connect = () => {
		
		client.current = new StompJS.Client({
			webSocketFactory: () => new SockJS("/web-socket"), // proxy를 통한 접속
			connectHeaders: {
				"X-XSRF-TOKEN": csrf
			},
			debug: function(debug) {
				console.log(debug);
			},
			reconnectDelay: 5000000,
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
			onConnect: () => {
				subscribe();
			},
			onStompError: (err) => {
				console.error("stomp err");
				console.error(err);
			}
		});

		client.current.activate();
	};

	const disconnect = () => {
		client.current.deactivate();
	}

	// 데이터 받는 부분
	const subscribe = () => {
		console.log(roomId.current);
		console.log(`${roomId.current}`);

		client.current.subscribe(`/queue/subscribe/${roomId.current}`, ({body}) => {
			setChat((_chat) => [..._chat, JSON.parse(body)]);
		});
	}

	// 데이터 전송 부분
	const publish = (msg) => {
		
		if(!client.current.connected) {
			return;
		}
		console.log(msg);
		client.current.publish({
			destination: "/pub/data",
			body: JSON.stringify({
				roomId: roomId.current,
				contents: msg 
			}), // vo랑 맞춰야함
		});

		setMsg("");
	}








	
	const connect2 = () => {
		
		client2.current = new StompJS.Client({
			webSocketFactory: () => new SockJS("/web-socket"), // proxy를 통한 접속
			connectHeaders: {
				"X-XSRF-TOKEN": csrf
			},
			debug: function(debug) {
				console.log(debug);
			},
			reconnectDelay: 5000000,
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
			onConnect: () => {
				subscribe2();
			},
			onStompError: (err) => {
				console.error("stomp err");
				console.error(err);
			}
		});

		client2.current.activate();
	};

	const disconnect2 = () => {
		client2.current.deactivate();
	}

	// 데이터 받는 부분
	const subscribe2 = () => {
		console.log(roomId2.current);
		console.log(`${roomId2.current}`);

		client2.current.subscribe(`/queue/subscribe/${roomId2.current}`, ({body}) => {
			setChat2((_chat) => [..._chat, JSON.parse(body)]);
		});
	}

	// 데이터 전송 부분
	const publish2 = (msg2) => {
		
		if(!client2.current.connected) {
			return;
		}
		console.log(msg2);
		client2.current.publish({
			destination: "/pub/data",
			body: JSON.stringify({
				roomId: roomId2.current,
				contents: msg2 
			}), // vo랑 맞춰야함
		});

		setMsg2("");
	}



	const connect3 = () => {
		
		client3.current = new StompJS.Client({
			webSocketFactory: () => new SockJS("/web-socket"), // proxy를 통한 접속
			connectHeaders: {
				"X-XSRF-TOKEN": csrf
			},
			debug: function(debug) {
				console.log(debug);
			},
			reconnectDelay: 5000000,
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
			onConnect: () => {
				subscribe3();
			},
			onStompError: (err) => {
				console.error("stomp err");
				console.error(err);
			}
		});

		client3.current.activate();
	};

	const disconnect3 = () => {
		client3.current.deactivate();
	}

	// 데이터 받는 부분
	const subscribe3 = () => {
		console.log(roomId3.current);
		console.log(`${roomId3.current}`);
		
		client3.current.subscribe(`/queue/subscribe/${roomId3.current}`, ({body}) => {
			setChat3((_chat) => [..._chat, JSON.parse(body)]);
		});
	}

	// 데이터 전송 부분
	const publish3 = (msg3) => {
		
		if(!client3.current.connected) {
			return;
		}
		console.log(msg3);
		client3.current.publish({
			destination: "/pub/data",
			body: JSON.stringify({
				roomId: roomId3.current,
				contents: msg3 
			}), // vo랑 맞춰야함
		});

		setMsg3("");
	}




	useEffect(() => {

		connect();
		connect2();
		connect3();

		return () => {
			disconnect();
			disconnect2();
			disconnect3();
		};

	}, []);

	return (
		<>
			{/* 메세지 전송 부분 */}
			<div style={{
				"position": "fixed",
				"top": "100px"
			}}>
				<input
					type={"text"}
					placeholder={"message"}
					value={msg}
					onChange={(e) => setMsg(e.target.value)}
					onKeyPress={(e) => e.target.keyCode === 13 && publish(msg)}
				/>
				<button onClick={() => publish(msg)}>send</button>
			</div>

			<div style={{
				"position": "fixed",
				"top": "200px"
			}}>
				<input
					type={"text"}
					placeholder={"message"}
					value={msg2}
					onChange={(e) => setMsg2(e.target.value)}
					onKeyPress={(e) => e.target.keyCode === 13 && publish2(msg2)}
				/>
				<button onClick={() => publish2(msg2)}>send</button>
			</div>

			<div style={{
				"position": "fixed",
				"top": "300px"
			}}>
				<input
					type={"text"}
					placeholder={"message"}
					value={msg3}
					onChange={(e) => setMsg3(e.target.value)}
					onKeyPress={(e) => e.target.keyCode === 13 && publish3(msg3)}
				/>
				<button onClick={() => publish3(msg3)}>send</button>
			</div>


			{/* 메세지 받는 부분 */}
			<div style={{
				"position": "fixed",
				"top": "100px",
				"left": "400px"
			}}>
				chat
				{chat && chat.length > 0 && (
					<ul>
					{chat.map((_chat, index) => (
						<li key={index}>{_chat.contents}</li>
					))}
					</ul>
				)}
			</div>
			<div style={{
				"position": "fixed",
				"top": "200px",
				"left": "400px"
			}}>
				chat2
				{chat2 && chat2.length > 0 && (
					<ul>
					{chat2.map((_chat, index) => (
						<li key={index}>{_chat.contents}</li>
					))}
					</ul>
				)}
			</div>
			<div style={{
				"position": "fixed",
				"top": "300px",
				"left": "400px"
			}}>
				chat3
				{chat3 && chat3.length > 0 && (
					<ul>
					{chat3.map((_chat, index) => (
						<li key={index}>{_chat.contents}</li>
					))}
					</ul>
				)}
			</div>







		</>
	);

}

export default Display;