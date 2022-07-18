import React from 'react'
import Link from 'next/link'
import {
    Button,
    Center
} from '@chakra-ui/react'


const MenuLinks = () => {
    return (
        <Center p='0 25'>
            <Link href="/movies">
                <Button m='15' size='lg'>Movies</Button>
            </Link>
            <Link href="/directors">
                <Button m='15' size='lg'>Directors</Button>
            </Link>
        </Center>
    )
}

export default MenuLinks