<?php

namespace App\GraphQL\Mutations\Auth;

use App\Services\Auth\AuthService;

class LoginMutation {
  public function __construct(private AuthService $authService) {}

  public function __invoke($_, array $args): string {
    return $this->authService->login($args['email'], $args['password']);
  }
}