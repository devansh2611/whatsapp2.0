import styled from 'styled-components';
import { Avatar, Button, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator';
import {auth, db} from '../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollection} from 'react-firebase-hooks/firestore'
import Chat from './Chat';

function Sidebar() {
    const [user] = useAuthState(auth);
    const userChatRef = db.collection('chats').where('users','array-contains',user.email);
    const[chatsSnapshot] = useCollection(userChatRef);


    const createChat = () => {
        

        const input = prompt(
            "Enter email address to chat with"
            );

            if(!input) return null ;

            if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
                // We need to add chat to db
                db.collection('chats').add({
                    users:[user.email,input]
                });
            }
    };

    const chatAlreadyExists = (recipient) => 
        !!chatsSnapshot?.docs.find(
            chat => 
                chat.data().users.find((user) => user === recipient.email)?.length>0
        );

    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
                <IconContainer>
                    <IconButton>
                        <ChatIcon />  
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                  
                </IconContainer>

            </Header>

            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search" />
            </Search>

            <SidebarButton onClick={createChat}>
                New chat
            </SidebarButton>

            {/* List Of Chats */}
            {chatsSnapshot?.docs.map(chat => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}


        </Container>
    )
}

export default Sidebar

const Container = styled.div``;

const Search = styled.div`
    display:flex;
    align-items:center;
    padding:20px;
    border-radius: 2px;

`;

const SidebarButton = styled(Button)`
    width:100%;
    
    &&&{
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
    

`;

const SearchInput = styled.input`
    outline-width:0;
    border:none;
    flex:1;
`;

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index:1;
    justify-content:space-between;
    align-items:center;
    padding: 15px;
    border: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover{
        opacity:0.8;
    }
`;

const IconContainer = styled.div``;