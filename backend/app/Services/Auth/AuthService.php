<?php

namespace App\Services\Auth;

use App\Repositories\Auth\UserRepository;
use App\DTOs\Auth\RegisterUserDTO;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService {
  public function __construct(
    private UserRepository $userRepository
  ) {}

  public function register(RegisterUserDTO $dto): string {
    $hashedDto = new RegisterUserDTO(
      name: $dto->name,
      email: $dto->email,
      password: Hash::make($dto->password)
    );
    
    $user = $this->userRepository->create($hashedDto);
    
    return $user->createToken('auth_token')->plainTextToken;
  }

  public function login(string $email, string $password): string {
    $user = $this->userRepository->findByEmail($email);

    if (!$user || !Hash::check($password, $user->password)) {
      throw ValidationException::withMessages(['email' => 'Invalid credentials']);
    }

    return $user->createToken('auth_token')->plainTextToken;
  }
}