<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Show the email verification prompt page.
     *
     * @OA\Get(
     *     path="/email/verify",
     *     summary="Email Verification Prompt",
     *     description="Displays the email verification prompt page or redirects to the dashboard if the email is already verified.",
     *     tags={"Authentication"},
     *     @OA\Response(
     *         response=200,
     *         description="Email verification prompt page rendered.",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", nullable=true, description="Status message from the session.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=302,
     *         description="Redirect to the dashboard if the email is verified."
     *     ),
     *     @OA\RequestBody(
     *         required=false,
     *         description="No request body required."
     *     ),
     *     security={{"sanctum": {}}}
     * )
     */
    public function __invoke(Request $request): Response|RedirectResponse
    {
        return $request->user()->hasVerifiedEmail()
                    ? redirect()->intended(route('dashboard', absolute: false))
                    : Inertia::render('auth/verify-email', ['status' => $request->session()->get('status')]);
    }
}
