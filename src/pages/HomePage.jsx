import '../css/Home.css'
import axiosClient from '../axiosClient';
import { useNavigate } from "react-router-dom";
import NavBar from '../components/navbar'
import TopTrend from '../components/TopTrend'
import TopicCard from '../components/TopicCard'

export default function HomePage() {

  const navigate = useNavigate()
  // eslint-disable-next-line no-unused-vars
  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.get('/logout')
      .then(() => {

        navigate('/login')
      })
  }

  

  return (
    <>
      <NavBar/>
      <TopTrend/>
      <TopicCard/>
    </>
  )
}
