import Image from 'next/image';

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

function CharactersList({ character }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className='h-88 w-88 relative mb-8 mt-2 grid items-center justify-center space-x-9 border bg-gray-50 shadow-md md:mt-10 md:w-80 lg:mt-10 lg:mb-8 lg:w-96 xl:mx-10'>
      <div
        className='
        mt-6 cursor-pointer
        transition-transform duration-300 ease-in-out hover:scale-105'
      >
        <Image src={character.image} height={320} width={320} onClick={onOpen} />
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>名前：{character.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight='bold' mb='2rem'>
                人種：{character.species}
                <br />
                居住地：{character.location.name}
              </Text>

              {/* <Lorem count={2} /> */}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      <span className='mb-3 mt-3'>{character.name}</span>
    </div>
  );
}

export default CharactersList;
