<x-mail::message>
{{-- resources/views/emails/account-created.blade.php --}}
<p>Hi {{ $name }},</p>

<p>An account has been created for you.</p>

<ul>
    <li><strong>Email:</strong> {{ $email }}</li>
    <li><strong>Temporary Password:</strong> {{ $temporaryPassword }}</li>
</ul>

<p>Please log in and change your password as soon as possible.</p>
{{ config('app.name') }}
</x-mail::message>
