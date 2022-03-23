import React, { useState } from 'react';

import './MoneyList.css';

import Item from "./Item/Item";
import Modal from "./Modal/Modal";

export default function MoneyList(props) {
	const [modal, setModal] = useState({open:false});
	
	const openModal = (id) => setModal({id:id,open:true});
	const closeModal = () => setModal({...modal,open:false});
	
	let values = [];
	
	for (let [id, info] of Object.entries(props.money[props.date].values)) values.push({...info, id:id}); //получаем массив для вывода
	
	return (
		<div className="money_list">
			{values.map((item, index) => { {
				return <Item item={item} openModal={openModal}/>;
			}})}
			<Modal id={modal.id} open={modal.open} money={props.money} date={props.date} closeModal={closeModal} updateData={props.updateData} getDateInfo={props.getDateInfo}/>
		</div>
	);
}
