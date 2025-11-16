/**
 * StudyGroupSearchCard Component
 * ------------------------------
 * Search and filter interface for study groups
 */
'use client';

import { Pane, Text } from 'evergreen-ui';
import { useState, useRef } from 'react';
import type { MouseEvent } from 'react';

interface StudyGroupSearchCardProps {
	onSearchChange?: (query: string) => void;
	onDateChange?: (date: string) => void;
	onCategoryChange?: (category: string) => void;
}

const categories = ['All Groups', 'Science', 'Mathematics', 'Humanities', 'Engineering', 'Social Sciences'];

export function StudyGroupSearchCard({
	onSearchChange,
	onDateChange,
	onCategoryChange,
}: StudyGroupSearchCardProps) {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All Groups');
	const [selectedDate, setSelectedDate] = useState('');
	const dateInputRef = useRef<HTMLInputElement>(null);

	const handleSearchChange = (value: string) => {
		setSearchQuery(value);
		onSearchChange?.(value);
	};

	const handleDateChange = (value: string) => {
		setSelectedDate(value);
		onDateChange?.(value);
	};

	const formatDateForDisplay = (dateString: string): string => {
		if (!dateString) return '';
		const date = new Date(dateString);
		const month = date.toLocaleDateString('en-US', { month: 'short' });
		const day = date.getDate();
		const year = date.getFullYear();
		return `${month} ${day}, ${year}`;
	};

	const handleDateInputClick = () => {
		dateInputRef.current?.showPicker?.() || dateInputRef.current?.click();
	};

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);
		onCategoryChange?.(category);
	};

	return (
		<Pane>
			{/* Search and Date Filters */}
			<Pane display='flex' gap={16} marginBottom={16}>
				{/* Search Bar */}
				<Pane
					position='relative'
					flex='1'
					maxWidth={400}
					display='flex'
					alignItems='center'
				>
					<svg
						width='20'
						height='20'
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						style={{
							position: 'absolute',
							left: '12px',
							pointerEvents: 'none',
						}}
					>
						<path
							d='M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z'
							stroke='#9CA3AF'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
						<path
							d='M19 19L14.65 14.65'
							stroke='#9CA3AF'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
					<input
						type='text'
						placeholder='Search study groups...'
						value={searchQuery}
						onChange={(e) => handleSearchChange(e.target.value)}
						style={{
							width: '100%',
							padding: '12px 12px 12px 44px',
							border: '1px solid #D1D5DB',
							borderRadius: '6px',
							fontSize: '14px',
							outline: 'none',
							fontFamily: 'inherit',
						}}
						onFocus={(e) => {
							e.target.style.borderColor = '#9CA3AF';
						}}
						onBlur={(e) => {
							e.target.style.borderColor = '#D1D5DB';
						}}
					/>
				</Pane>

				{/* Date Picker */}
				<Pane position='relative'>
					{/* Hidden date input */}
					<input
						ref={dateInputRef}
						type='date'
						value={selectedDate}
						onChange={(e) => handleDateChange(e.target.value)}
						style={{
							position: 'absolute',
							opacity: 0,
							pointerEvents: 'none',
							width: 0,
							height: 0,
						}}
					/>
					{/* Visible styled input */}
					<input
						type='text'
						readOnly
						value={selectedDate ? formatDateForDisplay(selectedDate) : ''}
						placeholder='Date'
						onClick={handleDateInputClick}
						style={{
							padding: '12px 36px 12px 12px',
							border: '1px solid #D1D5DB',
							borderRadius: '6px',
							fontSize: '14px',
							outline: 'none',
							cursor: 'pointer',
							backgroundColor: 'white',
							fontFamily: 'inherit',
							minWidth: '120px',
							color: selectedDate ? '#1F2937' : '#9CA3AF',
						}}
						onFocus={(e) => {
							e.target.style.borderColor = '#9CA3AF';
						}}
						onBlur={(e) => {
							e.target.style.borderColor = '#D1D5DB';
						}}
					/>
					<svg
						width='16'
						height='16'
						viewBox='0 0 16 16'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						style={{
							position: 'absolute',
							right: '12px',
							top: '50%',
							transform: 'translateY(-50%)',
							pointerEvents: 'none',
						}}
					>
						<path
							d='M4 6L8 10L12 6'
							stroke='#6B7280'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</Pane>
			</Pane>

			{/* Category Filters */}
			<Pane display='flex' gap={8} flexWrap='wrap'>
				{categories.map((category) => (
					<Pane
						key={category}
						cursor='pointer'
						paddingX={16}
						paddingY={8}
						borderRadius={6}
						background={selectedCategory === category ? '#EF4343' : 'white'}
						border='1px solid #D1D5DB'
						onClick={() => handleCategoryChange(category)}
						style={{
							transition: 'all 0.2s ease',
							borderColor: selectedCategory === category ? '#EF4343' : '#D1D5DB',
						}}
						onMouseEnter={(e: MouseEvent<HTMLDivElement>) => {
							if (selectedCategory !== category) {
								e.currentTarget.style.borderColor = '#9CA3AF';
							}
						}}
						onMouseLeave={(e: MouseEvent<HTMLDivElement>) => {
							if (selectedCategory !== category) {
								e.currentTarget.style.borderColor = '#D1D5DB';
							}
						}}
					>
						<Text
							fontSize={14}
							fontWeight={500}
							color={selectedCategory === category ? 'white' : '#1F2937'}
						>
							{category}
						</Text>
					</Pane>
				))}
			</Pane>
		</Pane>
	);
}

export default StudyGroupSearchCard;
