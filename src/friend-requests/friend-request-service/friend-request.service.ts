import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, take } from 'rxjs';
import { FriendRequestEntity } from '../Model/friendRequest.entity';
import { Repository } from 'typeorm';
import { FriendRequest } from '../Model/friendRequest.interface';
import { User } from 'src/user/model/user.interface';

@Injectable()
export class FriendRequestService {
  constructor(
    @InjectRepository(FriendRequestEntity)
    private readonly friendRequestRepository: Repository<FriendRequestEntity>,
  ) {}

  // ? TODO:
  // ? Must look for an entry where both ID's are present.
  // ? If not present, make and entry with 'pending' status
  // ? If present, do nothing or return a string
  sendFriendRequest(sender: User, reciever: User): any {
    return from(
      this.friendRequestRepository.find({
        where: {
          creator: { id: sender.id },
          reciever: { id: reciever.id },
        },
      }),
    ).pipe(
      map((ele) => {
        // If not undefined, we have or have had a relationship
        if (ele[0]) {
          console.log('IDK: ', ele[0]);
          return ele[0];
        } else {
          // Else we are trying to send new friend request
          const newRequestEnrry = this.friendRequestRepository.create({
            creator: sender,
            reciever: reciever,
            status: 'pending',
          });
          this.friendRequestRepository.save(newRequestEnrry);
          return { message: 'Friend Request Attempted' };
        }
      }),
    );
  }

  cancelFriendRequest(currentUser: User, otherUser: User) {
    console.log(currentUser.id, otherUser.id);
    return from(
      this.friendRequestRepository.find({
        where: {
          creator: { id: currentUser.id },
          reciever: { id: otherUser.id },
        },
      }),
    ).pipe(
      map((res) => {
        console.log('Entry found:', res[0]);
        if (!res[0]) {
          return res[0];
        } else {
          res.map((entry) => {
            return this.friendRequestRepository.delete(entry.id);
          });
        }
      }),
    );
  }

  getAllFriendRequests(user: User) {
    return this.friendRequestRepository
      .find({
        where: { reciever: { id: user.id } },
        relations: { creator: true },
      })
      .then((res) => {
        // // Go through array of friend requests objects and filter out senstive data of those Users
        return res.map((aUser) => {
          const { creator, ...potentialFriend } = aUser;
          const { password, role, ...restOfUser } = aUser.creator;
          const filteredSenstiveData = { ...potentialFriend, restOfUser };
          return filteredSenstiveData;
        });
      });
  }

  getAllSentFriendRequests(user: User) {
    return this.friendRequestRepository
      .find({
        where: { creator: { id: user.id } },
        relations: { reciever: true },
      })
      .then((res) => {
        // // Go through array of friend requests objects and filter out senstive data of those Users
        return res.map((friendRequestBlock) => {
          const { reciever, ...block } = friendRequestBlock;
          const { password, role, ...restOfUser } = friendRequestBlock.reciever;
          const filteredSenstiveData = { ...block, restOfUser };
          return filteredSenstiveData;
        });
      });
  }

  acceptFriendRequest(requestID: number) {
    return this.friendRequestRepository.update(requestID, {
      status: 'accepted',
    });
  }

  denyFriendRequest(requestID: number) {
    return this.friendRequestRepository.update(requestID, {
      status: 'denied',
    });
  }

  // findFriendRequest(sender: User, reciever: User) {
  //   return this.friendRequestRepository.find({
  //     where: {
  //       creator: { id: sender.id },
  //       reciever: { id: reciever.id },
  //     },
  //   });
  // }
}
