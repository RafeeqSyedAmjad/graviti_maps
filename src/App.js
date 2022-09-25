import img1 from './Images/gravitilogo.png';
import img2 from './Images/Title.svg';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  VStack,
  Input,
  SkeletonText,
  Text,
  Icon,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react'
import {FaMapMarkerAlt } from 'react-icons/fa'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'

const center = { lat: 48.8584, lng: 2.2945 }

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ['places'],
  })

  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
  }

  

  return (
    <Flex
      position='relative'
      flexDirection='row'
      alignItems='center'
      h='100vh'
      w='100vw'
      backgroundColor='rgb(244, 248, 250)'
    >
      <img style={{
        display :'flex',position : 'relative', left: "140px", right: "440px", bottom: "480px" ,backgroundColor : '#FFFFFF', justifyContent:"space-around", flexFlow:'row-wrap'}} src={img1} alt="" /> 
      <img src={img2} style={{ position: "relative", left: "520px", right: "440px", bottom: "318px" }} alt = ""/>
      <Box position='absolute' left={1100} top={250} h='511px' w='560px'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        // onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        minW='container.md'
        zIndex='1'
      >
        <VStack spacing='100px'  justifyContent='space-around' >
          <Text position='absolute' width='143px' height='25px' left='355px' top='360px' fontFamily='Work Sans' fontStyle='normal' fontWeight='400' fontSize='14px' lineHeight='21px' color='#000000' >Origin</Text>
          <Box w='264px' h='29px'  borderRadius='4px'>
            <Autocomplete>
              <InputGroup right='640px'>
                <InputLeftElement
                  pointerEvents='none'
                  children={<Icon as={FaMapMarkerAlt} w={6} h={6} color='darkred'/>}
                />
                <Input type='text' placeholder='Origin' ref={originRef} bgColor='#FFFFFF' _placeholder={{
                  color: '#4D6475', fontFamily: 'Rubik',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '24px',
                  lineHeight: '120%',
                }} />
              </InputGroup>
            </Autocomplete>
          </Box>
          <Text position='absolute' width='143px' height='25px' left='355px' top='390px' fontFamily='Work Sans' fontStyle='normal' fontWeight='400' fontSize='14px' lineHeight='21px' color='#000000'>Destination</Text>
          <Box w='264px' h='29px' borderRadius='4px'>
            <Autocomplete>
              <InputGroup right='640px'>
                <InputLeftElement
                  pointerEvents='none'
                  children={<Icon as={FaMapMarkerAlt} w={6} h={6} color='darkred' />}
                  _children = {{
                    right :  "300px",
                    position : 'absolute',
                  }}
                />
                <Input
                  type='text'
                  placeholder='Destination'
                  ref={destiantionRef}
                  bgColor='#FFFFFF'
                  _placeholder={{
                    color: '#4D6475', fontFamily: 'Rubik',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '24px',
                    lineHeight: '120%'
                  }}
                />
              </InputGroup>
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button bg='#1B31A8' type='submit' onClick={calculateRoute} borderRadius='32px' w='141px' h='62px' right= '300px' bottom ='200px'  gap='10px' fontSize='16px' fontFamily='Work Sans' fontStyle='normal' fontWeight='600' lineHeight='20px ' textColor=' #FFFFFF' _hover='none'>
              Calculate
            </Button>
          </ButtonGroup>
        </VStack>
        <VStack>
          <Box width='500px' height='24px' fontFamily='Work Sans' fontStyle='normal' fontWeight='400' fontSize='20px' lineHeight='120%' color='#1E2A32' bgColor='white' right=' 1070px' position= ' absolute' top= '600px' paddingTop= '30px' paddingBottom = '50px' paddingLeft = '20px'>Distance </Box>
          <Box width= '152px' height= '38px' fontFamily= 'Rubik' fontStyle= 'normal' fontWeight= '500' fontSize= '32px' lineHeight = '120%' color= '#0079ff' right='1070px' position= 'absolute' top = '615px'>{distance}</Box>
        </VStack>
      </Box>
    </Flex>
  )
}

export default App
