import { LoaderContainer, LoaderItem} from './Loader.styles'

const Loader = () => {
  return (
    <LoaderContainer>
      <LoaderItem animation='border' role='status'>
        <span className='sr-only'>Loading...</span>
      </LoaderItem>
    </LoaderContainer>
  )
}

export default Loader
