<?php

namespace App\GraphQL\Mutations\Auth;

use App\Services\Auth\AuthService;
use App\DTOs\Auth\RegisterUserDTO;

class SignupMutation {
  public function __construct(private AuthService $authService) {}

  public function __invoke($_, array $args): string {
    $dto = new RegisterUserDTO(
      name: $args['name'],
      email: $args['email'],
      password: $args['password']
    );
      
    return $this->authService->register($dto);
  }
}