import React, { BaseSyntheticEvent, useState } from 'react'
import { Container } from './Container/Container'
import './App.scss'

interface IItem {
  id: number
  title: string
}

const createItemsArray = (numberOfItems: number): Array<IItem> => {
  return new Array(numberOfItems).fill('').map((_, idx) => ({
    id: idx,
    title: `Item ${idx + 1}`,
  }))
}

const maxLenghtOfItems = 100
const initalCountOfItems = 10
let scrollPosition = 0

const App: React.FC = () => {
  const [countOfItems, setCountOfItems] = useState(initalCountOfItems)
  const [items, setItems] = useState<Array<IItem>>(
    createItemsArray(countOfItems),
  )

  const createMoteItems = () => {
    setCountOfItems(prev => prev + 1)
    setItems(prev => createItemsArray(countOfItems + 1))
  }

  const createLessItems = () => {
    setCountOfItems(prev => prev - 1)
    setItems(prev => createItemsArray(countOfItems - 1))
  }

  const resetItems = () => {
    setCountOfItems(prev => initalCountOfItems)
    setItems(prev => createItemsArray(initalCountOfItems))
  }

  const scrollHandler = (e: BaseSyntheticEvent) => {
    const scrollHeight = e.target.scrollHeight
    const scrollTop = e.target.scrollTop
    const clientHeight = e.target.clientHeight

    const isEnd = scrollHeight - scrollTop <= clientHeight

    if (items.length < maxLenghtOfItems && items.length >= initalCountOfItems) {
      if (isEnd) createMoteItems()
      if (scrollPosition > scrollTop || scrollTop === 0) {
        createLessItems()
      }
      scrollPosition = scrollTop
    } else {
      resetItems()
      e.target.scrollTop = 0
    }
  }

  return (
    <Container>
      <div className="sc__body">
        <div className="sc__items">
          <div className="sc__items-body" onScroll={scrollHandler}>
            {items.map(({ id, title }) => (
              <div className="sc__item" key={id}>
                {title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default App
