<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

/**
 * @OA\Post(
 *     path="/email/verify",
 *     summary="Verify email address",
 *     description="Marks the authenticated user's email address as verified.",
 *     operationId="verifyEmail",
 *     tags={"Authentication"},
 *     @OA\RequestBody(
 *         required=true,
 *         description="Email verification request",
 *         @OA\JsonContent(
 *             @OA\Property(property="email", type="string", example="user@example.com"),
 *             @OA\Property(property="token", type="string", example="verification-token")
 *         )
 *     ),
 *     @OA\Response(
 *         response=302,
 *         description="Redirects to the dashboard with a verified query parameter."
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Unauthorized"
 *     )
 * )
 */
class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
        }

        if ($request->user()->markEmailAsVerified()) {
            /** @var \Illuminate\Contracts\Auth\MustVerifyEmail $user */
            $user = $request->user();

            event(new Verified($user));
        }

        return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
    }
}
