import { useState } from 'react'
import { SButtonLink } from '../../styles/buttonStyles'
import { s } from '../../styles/variables'
import { SFixedContainer, SFlexContainer } from '../../styles/containerStyles'
import { SInput, SSelect } from '../../styles/formStyles'
import { TasksListDetail } from './TasksListDetail'

const TasksList = () => {
  const [activeStatus, setActiveStatus] = useState(true)
  const onChangeActiveStatus = (event) => {
    const activeStatus = event.target.value
    setActiveStatus(activeStatus)
  }

  const [searchTask, setSearchTask] = useState('')
  const onChangeSearchTask = (event) => {
    const searchTask = event.target.value
    setSearchTask(searchTask)
  }

  return (
    <SFixedContainer maxwidth={`${s.md}`}>
      <h2>Tasks</h2>
      <SFlexContainer>
        <SSelect
          onChange={(event) => {
            onChangeActiveStatus(event)
          }}
          width='10rem'
        >
          <option value='true'>Show Active</option>
          <option value='false'>Show Closed</option>
          <option value=''>Show All</option>
        </SSelect>
        <SInput
          type='search'
          className='form-control'
          placeholder='Search by task name'
          value={searchTask}
          onChange={onChangeSearchTask}
          width={'20rem'}
          margin={'0 1em'}
        />
        <SButtonLink to={'/task'}>Add New</SButtonLink>
      </SFlexContainer>
      <TasksListDetail searchTask={searchTask} activeStatus={activeStatus} />
    </SFixedContainer>
  )
}

export default TasksList
