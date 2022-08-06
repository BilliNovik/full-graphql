import React from 'react'
import { Button } from '@chakra-ui/react'
import styles from './Pagination.module.scss'

const Pagination = ({ elementsPerPage, totalElements, paginate, currentPage }) => {

  const pageNumbers = []

  for (let i = 0; i < Math.ceil(totalElements / elementsPerPage); i++) {
    pageNumbers.push(i + 1)
  }

  return (
    <div className={styles.container}>
      <Button colorScheme='blue' className={styles.button} disabled={currentPage === 1}
        onClick={() => paginate(prevNum => prevNum - 1)}>Prev</Button>
      <ul className={styles.ul}>
        {
          pageNumbers.map(num => (
            <li key={num} className={`${styles.li} ${num === currentPage ? styles.active : ''}`}>
              <Button colorScheme='blue' onClick={() => paginate(num)}>{num}</Button>
            </li>
          ))
        }
      </ul>
      <Button colorScheme='blue' className={styles.button} disabled={currentPage === Math.ceil(totalElements / elementsPerPage)}
        onClick={() => paginate(prevNum => prevNum + 1)}>Next</Button>
    </div >
  )
}

export default Pagination