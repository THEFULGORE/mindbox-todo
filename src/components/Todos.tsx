import { Button, Checkbox, Input, List, Radio, RadioChangeEvent, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setChecked, setCompleted, setTodos, todoTask } from '../redux/reducers/tasksSlice';
import { PlusOutlined } from '@ant-design/icons';
import './Todos.css';

const { Text, Title } = Typography;

const Todos = () => {
	const todos = useAppSelector((state) => state.tasks);
	const dispatch = useAppDispatch();
	const [text, setText] = useState('');
	const [filter, setFilter] = useState('All');
	const [filteredData, setFilteredData] = useState<todoTask[]>();

	useEffect(() => {
		switch (filter) {
			case 'All':
				setFilteredData(todos.tasks);
				break;
			case 'Active':
				setFilteredData(todos.tasks.filter((el) => !el.checked));
				break;
			case 'Completed':
				setFilteredData(todos.tasks.filter((el) => el.checked));
				break;
			default:
				break;
		}
	}, [todos, filter]);

	const submitHandler = () => {
		dispatch(
			setTodos({
				text,
				checked: false,
			})
		);
	};

	const handleCheck = (flag: boolean, index: number) => {
		dispatch(
			setChecked({
				index,
				checked: !flag,
			})
		);
	};

	const radioButtonsHandler = ({ target: { value } }: RadioChangeEvent) => {
		setFilter(value);
	};

	const clearCompleted = () => {
		dispatch(setCompleted(todos.tasks.filter((el: any) => !el.checked)));
	};

	return (
		<div className="todos-container">
			<Title>Todos</Title>
			<div className="todos">
				<List>
					<List.Item style={{ padding: '.3rem' }}>
						<Input
							placeholder="What needs to be done?"
							value={text}
							onChange={(e) => setText(e.target.value)}
						></Input>
						<Button type="primary" onClick={() => submitHandler()}>
							<PlusOutlined />
						</Button>
					</List.Item>
					{filteredData?.map((el, index) => (
						<List.Item key={index} style={{ paddingLeft: '.5rem' }}>
							<Checkbox checked={el.checked} onClick={() => handleCheck(el.checked, index)}>
								<Text
									style={
										el.checked ? { textDecoration: 'line-through' } : { textDecoration: 'none' }
									}
								>
									{el.text}
								</Text>
							</Checkbox>
						</List.Item>
					))}
					<List.Item style={{ padding: '.3rem .5rem' }}>
						<Text type="secondary">{todos.tasks.filter((el) => el.checked).length} items left</Text>
						<Radio.Group onChange={radioButtonsHandler}>
							<Radio.Button value="All" autoFocus>
								All
							</Radio.Button>
							<Radio.Button value="Active">Active</Radio.Button>
							<Radio.Button value="Completed">Completed</Radio.Button>
						</Radio.Group>
						<Text type="secondary" className="todos__clear" onClick={() => clearCompleted()}>
							Clear completed
						</Text>
					</List.Item>
				</List>
			</div>

			<div className="todos__style1"></div>
			<div className="todos__style2"></div>
		</div>
	);
};

export default Todos;
