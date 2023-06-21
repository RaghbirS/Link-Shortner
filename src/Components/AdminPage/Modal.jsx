import { DeleteIcon } from '@chakra-ui/icons';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    ChakraProvider,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

export default function BasicUsage({ onClick, funcClose, openModelFunc }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <ChakraProvider>
            <Button _hover={{ background: "#ff6868" }} color={"white"} background={"red"} onClick={() => {
                if (openModelFunc()) onOpen()
            }}> <DeleteIcon sx={{ mr: "10px" }} /> Delete</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Do you want to delete selected entries.
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => {
                            funcClose()
                            onClose()
                        }}>
                            Close
                        </Button>
                        <Button onClick={() => {
                            onClick();
                            onClose();
                        }} _hover={{ background: "#ff6868" }} color={"white"} background={"red"} variant='ghost'>Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    )
}