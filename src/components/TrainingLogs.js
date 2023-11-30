import { useAuth } from '@/hooks/useAuth'
import TrainingLogDisplay from '@/components/TrainingLogDisplay'
import TrainingLogCreation from '@/components/TrainingLogCreation'
import TrainingLogEdit from '@/components/TrainingLogEdit'
import Header from '@/components/Header'
import styles from '@/styles/TrainingPage.module.css'
import { useState, useEffect } from 'react'
import useDebounce from '@/hooks/useDebounce'

export default function TrainingLogs (props) {
  const { userId, admin, username, login, logout } = useAuth()
  //const [ currentSearch, setCurrentSearch ] = useState("");
  const { currentSearch, setCurrentSearch, create, setCreate, edit, setEdit } =
    props
  const [logList, setLogList] = useState([])
  const debouncedEdit = useDebounce(edit, 400)
  useEffect(() => {
    //Set training logList and everything

    async function createList () {
      const response = await fetch('/api/admin/training')
      const data = await response.json()
      setLogList(data)
    }
    createList()
  }, [create, debouncedEdit])

  return (
    <div className={styles.trainingStuff}>
      <Header
        title='Training Logs'
        createFeature={!create && !edit}
        setEdit={setEdit}
        setCreate={setCreate}
      />
      {edit ? (
        <TrainingLogEdit setEdit={setEdit} edit={edit} userId={userId} />
      ) : (
        <></>
      )}
      {create ? (
        <TrainingLogCreation setCreate={setCreate} userId={userId} />
      ) : (
        <></>
      )}
      {create || edit ? (
        <></>
      ) : (
        <div className={styles.trainingList}>
          {logList.map(logItem => {
            if (logItem.user === userId) {
              //Now check and ensure that the search query exists is in a created search query string.
              //Let the TrainingLogDisplay decide whether to conditionally render itself or not.
              return (
                <TrainingLogDisplay
                  key={logItem._id}
                  setEdit={setEdit}
                  edit={edit}
                  {...logItem}
                  debouncedEdit={debouncedEdit}
                  currentSearch={currentSearch}
                />
              )
            }
            //Key prop provides react with a unique identifier for each object, making it easier for it to render.
          })}
        </div>
      )}
    </div>
  )
}
