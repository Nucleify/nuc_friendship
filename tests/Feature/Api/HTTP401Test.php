<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('friendship-api-401');
uses()->group('api-401');

beforeEach(function (): void {
    $this->createUsers();
});

describe('401', function (): void {
    apiTestArray([
        'index api' => [
            'method' => 'GET',
            'route' => 'friendship.index',
            'status' => 401,
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'sendRequest api' => [
            'method' => 'POST',
            'route' => 'friendship.sendRequest',
            'status' => 401,
            'id' => 1,
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'acceptRequest api' => [
            'method' => 'POST',
            'route' => 'friendship.acceptRequest',
            'status' => 401,
            'id' => 1,
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'denyRequest api' => [
            'method' => 'POST',
            'route' => 'friendship.denyRequest',
            'status' => 401,
            'id' => 1,
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'removeFriend api' => [
            'method' => 'DELETE',
            'route' => 'friendship.remove',
            'status' => 401,
            'id' => 1,
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'blockFriend api' => [
            'method' => 'POST',
            'route' => 'friendship.block',
            'status' => 401,
            'id' => 1,
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'unblockFriend api' => [
            'method' => 'DELETE',
            'route' => 'friendship.unblock',
            'status' => 401,
            'id' => 1,
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
    ]);
});
