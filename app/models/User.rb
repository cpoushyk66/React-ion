class User < ActiveRecord::Base
    has_many :characters

    def log_in
        self.update(last_logged_in: Time.now)
        self
    end
end