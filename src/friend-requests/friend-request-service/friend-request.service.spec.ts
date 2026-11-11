import { Test, TestingModule } from '@nestjs/testing';
import { FriendRequestService } from './friend-request.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FriendRequestEntity } from '../Model/friendRequest.entity';
import { firstValueFrom } from 'rxjs';

describe('FriendRequestService', () => {
  let service: FriendRequestService;
  const friendRequestRepository = {
    find: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FriendRequestService,
        {
          provide: getRepositoryToken(FriendRequestEntity),
          useValue: friendRequestRepository,
        },
      ],
    }).compile();

    service = module.get<FriendRequestService>(FriendRequestService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deletes the current user’s matching sent friend requests', async () => {
    friendRequestRepository.find.mockResolvedValue([{ id: 12 }, { id: 13 }]);
    friendRequestRepository.delete.mockResolvedValue({
      affected: 2,
      raw: [],
    });

    const result = await firstValueFrom(
      service.cancelFriendRequest({ id: 1 }, { id: 2 }),
    );

    expect(friendRequestRepository.find).toHaveBeenCalledWith({
      where: {
        creator: { id: 1 },
        reciever: { id: 2 },
      },
    });
    expect(friendRequestRepository.delete).toHaveBeenCalledWith([12, 13]);
    expect(result).toEqual({ affected: 2, raw: [] });
  });

  it('does nothing when no matching sent request exists', async () => {
    friendRequestRepository.find.mockResolvedValue([]);

    const result = await firstValueFrom(
      service.cancelFriendRequest({ id: 1 }, { id: 2 }),
    );

    expect(friendRequestRepository.delete).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('deletes an accepted friendship in either direction', async () => {
    friendRequestRepository.find.mockResolvedValue([{ id: 21 }]);
    friendRequestRepository.delete.mockResolvedValue({
      affected: 1,
      raw: [],
    });

    const result = await firstValueFrom(
      service.removeFriend({ id: 1 }, 2),
    );

    expect(friendRequestRepository.find).toHaveBeenCalledWith({
      where: [
        {
          creator: { id: 1 },
          reciever: { id: 2 },
          status: 'accepted',
        },
        {
          creator: { id: 2 },
          reciever: { id: 1 },
          status: 'accepted',
        },
      ],
    });
    expect(friendRequestRepository.delete).toHaveBeenCalledWith([21]);
    expect(result).toEqual({ affected: 1, raw: [] });
  });

  it('does nothing when the users are not friends', async () => {
    friendRequestRepository.find.mockResolvedValue([]);

    const result = await firstValueFrom(service.removeFriend({ id: 1 }, 2));

    expect(friendRequestRepository.delete).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('returns the other user when the current user received the friendship', async () => {
    friendRequestRepository.find.mockResolvedValue([
      {
        id: 21,
        status: 'accepted',
        creator: { id: 2, name: 'Friend', password: 'secret', role: 'user' },
        reciever: { id: 1, name: 'Current user', password: 'secret', role: 'user' },
      },
    ]);

    const result = await firstValueFrom(service.getAllFriends(1));

    expect(result).toEqual([
      {
        id: 21,
        status: 'accepted',
        restOfUser: { id: 2, name: 'Friend' },
      },
    ]);
  });
});
