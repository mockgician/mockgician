fmt:
	poetry run ruff format app
	poetry run ruff check app --fix
	poetry run toml-sort pyproject.toml

lint:
	poetry run ruff format --check app
	poetry run ruff check app
	# cd app && poetry run mypy .
	poetry run toml-sort pyproject.toml --check
