<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;


/**
 * @OA\Post(
 *     path="/email/verification-notification",
 *     summary="Send a new email verification notification",
 *     description="Sends a new email verification notification to the user.",
 *     tags={"Email Verification"},
 *     @OA\RequestBody(
 *         required=false,
 *         description="No request body required for this endpoint."
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Verification link sent successfully.",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="verification-link-sent")
 *         )
 *     ),
 *     @OA\Response(
 *         response=302,
 *         description="Redirects if the user has already verified their email."
 *     )
 * )
 */
class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('dashboard', absolute: false));
        }

        $request->user()->sendEmailVerificationNotification();

        return back()->with('status', 'verification-link-sent');
    }
}
