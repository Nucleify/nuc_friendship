<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('friendship-api-405');
uses()->group('friendship-api-405-auth');
uses()->group('api-405');
uses()->group('api-405-auth');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('405 > Authorized', function (): void {
    apiTestArray([
        'post > index api' => [
            'method' => 'POST',
            'route' => 'friendship.index',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'post json > index api' => [
            'method' => 'POST',
            'route' => 'friendship.index',
            'status' => 405,
            'id' => 1,
        ],
        'put > index api' => [
            'method' => 'PUT',
            'route' => 'friendship.index',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'put json > index api' => [
            'method' => 'PUT',
            'route' => 'friendship.index',
            'status' => 405,
            'id' => 1,
        ],
        'delete > index api' => [
            'method' => 'DELETE',
            'route' => 'friendship.index',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'delete json > index api' => [
            'method' => 'DELETE',
            'route' => 'friendship.index',
            'status' => 405,
            'id' => 1,
        ],
        'put > sendRequest api' => [
            'method' => 'PUT',
            'route' => 'friendship.sendRequest',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'delete > sendRequest api' => [
            'method' => 'DELETE',
            'route' => 'friendship.sendRequest',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'put > acceptRequest api' => [
            'method' => 'PUT',
            'route' => 'friendship.acceptRequest',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'delete > acceptRequest api' => [
            'method' => 'DELETE',
            'route' => 'friendship.acceptRequest',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'put > denyRequest api' => [
            'method' => 'PUT',
            'route' => 'friendship.denyRequest',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'delete > denyRequest api' => [
            'method' => 'DELETE',
            'route' => 'friendship.denyRequest',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'post > removeFriend api' => [
            'method' => 'POST',
            'route' => 'friendship.remove',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'put > removeFriend api' => [
            'method' => 'PUT',
            'route' => 'friendship.remove',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'put > blockFriend api' => [
            'method' => 'PUT',
            'route' => 'friendship.block',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'delete > blockFriend api' => [
            'method' => 'DELETE',
            'route' => 'friendship.block',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'post > unblockFriend api' => [
            'method' => 'POST',
            'route' => 'friendship.unblock',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'put > unblockFriend api' => [
            'method' => 'PUT',
            'route' => 'friendship.unblock',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
    ]);
});
