from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from groq import Groq
import os
import json

# Use settings to get API key
api_key = settings.API_KEY

# Refactor Groq API call into a helper function for cleaner code
def get_groq_response(user_input):
    """Helper function to handle the Groq API call."""
    try:
        client = Groq(api_key=api_key)
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": user_input}],
            model="llama3-groq-70b-8192-tool-use-preview",
            temperature=0.3,
            max_tokens=1024
        )
        # Return only the message content from the response
        return chat_completion.choices[0].message.content, None
    except Exception as e:
        # Catch any error and return it along with a None response
        return None, str(e)

def result_json_view(request):
    result_json_path = os.path.join(settings.BASE_DIR, 'core', 'static', 'others', 'result.json')
    if os.path.exists(result_json_path):
        with open(result_json_path, 'r', encoding='utf-8') as f:
            result_data = json.load(f)
        return JsonResponse(result_data)
    else:
        return JsonResponse({'error': 'File not found'}, status=404)

# View for rendering the index page
def index(request):
    return render(request, 'chatbot.html')

def dashboard(request):
    return render(request, 'dashboard.html')

# View to handle user input and respond with Groq's API output
@csrf_exempt
def handle_input(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_input = data.get('user_input', '').strip()

            if not user_input:
                return JsonResponse({'status': 'error', 'message': 'Input is empty'}, status=400)

            # Call the helper function for Groq API response
            output, error = get_groq_response(user_input)

            if error:
                # If there was an error, return the error message in the response
                return JsonResponse({'status': 'error', 'message': f"API error: {error}"}, status=500)

            # Return the processed input from Groq's API
            return JsonResponse({'status': 'success', 'processed_input': output})

        except json.JSONDecodeError:
            # Handle JSON parsing errors gracefully
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON format'}, status=400)
        except Exception as e:
            # General exception handler for any other errors
            return JsonResponse({'status': 'error', 'message': f"Unexpected error: {str(e)}"}, status=500)
