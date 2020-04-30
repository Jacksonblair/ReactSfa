import React from 'react';
import classes from './LocalConfig.css';

const localConfig = props => {

	/*https://itnext.io/heres-why-mapping-a-constructed-array-doesn-t-work-in-javascript-f1195138615a*/
	let arr = [...Array(4)].map((_, i) => i); // construct array of 4
	let positionClass = [
		`${classes.button} + ${classes.top} + ${classes.left}`, 
		`${classes.button} + ${classes.top} + ${classes.right}`, 
		`${classes.button} + ${classes.bottom} + ${classes.left}`, 
		`${classes.button} + ${classes.bottom} + ${classes.right}`
	]

	let buttons = arr.map((v, index) => {
		let activeClass = index == props.positionIndex ? classes.active : null;
		return <button key={index} className={`${positionClass[index]} + ${activeClass}`} onClick={() => props.clicked(index)}/>
	})

	return (
		<div className={classes.localConfig}>
			<p className={classes.configHeader}> Screen position </p>
			<div className={classes.container}>
				<div className={`${classes.bar} + ${classes.barTop}`}/>
				<div className={`${classes.bar} + ${classes.barBottom}`}/>
				{buttons}
			</div>
		</div>
	)
}

export default localConfig;