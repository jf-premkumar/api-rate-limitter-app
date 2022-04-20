
import{useState, useEffect} from "react"
import { Text } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'

export const MakeCalls = () => {
    const [result, setresult] = useState("");
   
    const makeAPICall = () => {
        fetch("http://localhost:2500/get_wishes")
        .then((res) => (res.json()))
        .then((data) => setresult(data.message))
    }
    return(
      <div style = {{border: "1px solid black", boxSizing: "border-box", width: "65%", height : "200px", margin: "1% auto"}}>

       <Text fontSize='4xl' margin = "2%">Welcome to API Rate Limitter App</Text>
       <Button onClick = {() => {makeAPICall()}} colorScheme='blue'>Make API Call</Button>
       <Text fontSize='3xl' color = "blue">{result}</Text>
      </div>
    )
}