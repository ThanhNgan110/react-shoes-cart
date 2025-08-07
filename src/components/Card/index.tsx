import type { ReactElement } from 'react'

interface CardProps {
	title: string
	amount?: string
	total?: number
	children: ReactElement
}

export const Card = ({ title, total, amount, children }: CardProps) => {
	return (
		<>
			<div className="card">
				<div className="cardTop">
					<img alt="" src="https://cdn-icons-png.flaticon.com/512/732/732084.png" />
					{total && <div>Total: {total}</div>}
				</div>
				<div className="cardTitle">
					<span>{title}</span>
					{amount && <span className="card_amount">{amount}</span>}
				</div>
				<div className="cardBody">{children}</div>
			</div>
		</>
	)
}
